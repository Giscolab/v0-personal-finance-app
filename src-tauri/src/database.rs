use sqlx::{SqlitePool, Row, sqlite::SqliteConnectOptions};
use chrono::{DateTime, Utc};
use uuid::Uuid;
use anyhow::{Result, anyhow};
use crate::models::*;
use crate::security::SecurityManager;
use std::str::FromStr;

pub struct DatabaseManager {
    pool: SqlitePool,
    security: SecurityManager,
    encryption_key: [u8; 32],
}

impl DatabaseManager {
    pub async fn new(password: &str) -> Result<Self> {
        let security = SecurityManager::new();
        let encryption_key = security.derive_key(password)?;
        
        let database_url = "sqlite:finance.db";
        let options = SqliteConnectOptions::from_str(database_url)?
            .pragma("key", format!("\"x'{}'\"", hex::encode(&encryption_key)))
            .pragma("cipher_page_size", "4096")
            .pragma("kdf_iter", "200000") // 200k iterations for PBKDF2
            .pragma("cipher_hmac_algorithm", "HMAC_SHA256")
            .pragma("cipher_kdf_algorithm", "PBKDF2_HMAC_SHA256");
            
        let pool = SqlitePool::connect_with(options).await?;
        
        // Test database access with a simple query
        sqlx::query("SELECT 1").fetch_one(&pool).await
            .map_err(|_| anyhow!("Mot de passe incorrect ou base de données corrompue"))?;
        
        // Initialize database schema
        Self::initialize_schema(&pool).await?;
        
        Ok(DatabaseManager { 
            pool, 
            security,
            encryption_key,
        })
    }

    async fn initialize_schema(pool: &SqlitePool) -> Result<()> {
        sqlx::query(r#"
            CREATE TABLE IF NOT EXISTS transactions (
                id TEXT PRIMARY KEY,
                description_encrypted TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL,
                category_encrypted TEXT NOT NULL,
                account TEXT NOT NULL,
                hash TEXT NOT NULL, -- For duplicate detection
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        "#).execute(pool).await?;

        sqlx::query(r#"
            CREATE TABLE IF NOT EXISTS budgets (
                id TEXT PRIMARY KEY,
                category_encrypted TEXT NOT NULL,
                amount REAL NOT NULL,
                spent REAL DEFAULT 0.0,
                period TEXT NOT NULL DEFAULT 'monthly',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        "#).execute(pool).await?;

        sqlx::query(r#"
            CREATE TABLE IF NOT EXISTS categories (
                id TEXT PRIMARY KEY,
                name_encrypted TEXT NOT NULL,
                color TEXT,
                icon TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        "#).execute(pool).await?;

        sqlx::query(r#"
            CREATE TABLE IF NOT EXISTS accounts (
                id TEXT PRIMARY KEY,
                name_encrypted TEXT NOT NULL,
                type TEXT NOT NULL,
                balance REAL DEFAULT 0.0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        "#).execute(pool).await?;

        sqlx::query("CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date)").execute(pool).await?;
        sqlx::query("CREATE INDEX IF NOT EXISTS idx_transactions_hash ON transactions(hash)").execute(pool).await?;
        sqlx::query("CREATE INDEX IF NOT EXISTS idx_transactions_amount ON transactions(amount)").execute(pool).await?;

        Ok(())
    }

    pub async fn add_transaction(&self, transaction: &Transaction) -> Result<()> {
        let encrypted_description = self.security.encrypt(&transaction.description, &self.encryption_key)?;
        let encrypted_category = self.security.encrypt(&transaction.category, &self.encryption_key)?;
        
        // Create hash for duplicate detection
        let hash_input = format!("{}{}{}{}", 
            transaction.description, transaction.amount, transaction.date, transaction.account);
        let hash = self.security.create_hash(&hash_input)?;
        
        // Check for duplicates
        let existing = sqlx::query!(
            "SELECT COUNT(*) as count FROM transactions WHERE hash = ?",
            hash
        ).fetch_one(&self.pool).await?;
        
        if existing.count > 0 {
            return Err(anyhow!("Transaction en double détectée"));
        }
        
        sqlx::query!(
            "INSERT INTO transactions (id, description_encrypted, amount, date, category_encrypted, account, hash) 
             VALUES (?, ?, ?, ?, ?, ?, ?)",
            transaction.id,
            encrypted_description,
            transaction.amount,
            transaction.date,
            encrypted_category,
            transaction.account,
            hash
        ).execute(&self.pool).await?;
        
        Ok(())
    }

    pub async fn get_transactions(&self, limit: Option<i32>) -> Result<Vec<Transaction>> {
        let limit = limit.unwrap_or(100);
        
        let rows = sqlx::query!(
            "SELECT id, description_encrypted, amount, date, category_encrypted, account 
             FROM transactions ORDER BY date DESC LIMIT ?",
            limit
        ).fetch_all(&self.pool).await?;

        let mut transactions = Vec::new();
        for row in rows {
            let description = self.security.decrypt(&row.description_encrypted, &self.encryption_key)?;
            let category = self.security.decrypt(&row.category_encrypted, &self.encryption_key)?;
            
            transactions.push(Transaction {
                id: row.id,
                description,
                amount: row.amount,
                date: row.date,
                category,
                account: row.account,
            });
        }
        
        Ok(transactions)
    }

    pub async fn get_balance_history(&self, days: i32) -> Result<Vec<BalancePoint>> {
        let rows = sqlx::query!(
            "SELECT date, amount FROM transactions 
             WHERE date >= date('now', '-{} days') 
             ORDER BY date ASC",
            days
        ).fetch_all(&self.pool).await?;

        let mut balance = 0.0;
        let mut history = Vec::new();
        let mut current_date = String::new();
        let mut daily_total = 0.0;
        
        for row in rows {
            if row.date != current_date {
                if !current_date.is_empty() {
                    balance += daily_total;
                    history.push(BalancePoint {
                        date: current_date.clone(),
                        balance,
                    });
                }
                current_date = row.date;
                daily_total = 0.0;
            }
            daily_total += row.amount;
        }
        
        // Add the last day
        if !current_date.is_empty() {
            balance += daily_total;
            history.push(BalancePoint {
                date: current_date,
                balance,
            });
        }
        
        Ok(history)
    }

    pub async fn get_financial_metrics(&self) -> Result<FinancialMetrics> {
        // Calculate burn rate (average daily expenses over last 30 days)
        let burn_rate_row = sqlx::query!(
            "SELECT AVG(daily_expense) as burn_rate FROM (
                SELECT DATE(date) as day, SUM(ABS(amount)) as daily_expense 
                FROM transactions 
                WHERE amount < 0 AND date >= date('now', '-30 days')
                GROUP BY DATE(date)
            )"
        )
        .fetch_one(&self.pool)
        .await?;

        let burn_rate = burn_rate_row.burn_rate.unwrap_or(0.0);

        // Calculate current balance
        let balance_row = sqlx::query!(
            "SELECT SUM(amount) as balance FROM transactions"
        )
        .fetch_one(&self.pool)
        .await?;

        let balance = balance_row.balance.unwrap_or(0.0);

        // Calculate runway (days until balance reaches zero)
        let runway = if burn_rate > 0.0 { balance / burn_rate } else { 999.0 };

        // Calculate ITT (Income Tension Index)
        let income_row = sqlx::query!(
            "SELECT SUM(amount) as income FROM transactions 
             WHERE amount > 0 AND date >= date('now', '-30 days')"
        )
        .fetch_one(&self.pool)
        .await?;

        let expense_row = sqlx::query!(
            "SELECT SUM(ABS(amount)) as expenses FROM transactions 
             WHERE amount < 0 AND date >= date('now', '-30 days')"
        )
        .fetch_one(&self.pool)
        .await?;

        let income = income_row.income.unwrap_or(0.0);
        let expenses = expense_row.expenses.unwrap_or(0.0);
        let itt = if expenses > 0.0 { income / expenses } else { 999.0 };

        // Calculate volatility (standard deviation of daily balances)
        let volatility = self.calculate_volatility().await?;

        // Calculate max drawdown
        let drawdown = self.calculate_max_drawdown().await?;

        Ok(FinancialMetrics {
            balance,
            burn_rate,
            runway,
            itt,
            volatility,
            drawdown,
        })
    }

    async fn calculate_volatility(&self) -> Result<f64> {
        let balances = self.get_balance_history(30).await?;
        if balances.len() < 2 {
            return Ok(0.0);
        }

        let mean = balances.iter().map(|b| b.balance).sum::<f64>() / balances.len() as f64;
        let variance = balances.iter()
            .map(|b| (b.balance - mean).powi(2))
            .sum::<f64>() / balances.len() as f64;
        
        Ok(variance.sqrt())
    }

    async fn calculate_max_drawdown(&self) -> Result<f64> {
        let balances = self.get_balance_history(90).await?;
        if balances.is_empty() {
            return Ok(0.0);
        }

        let mut max_balance = balances[0].balance;
        let mut max_drawdown = 0.0;

        for point in &balances {
            if point.balance > max_balance {
                max_balance = point.balance;
            }
            let drawdown = max_balance - point.balance;
            if drawdown > max_drawdown {
                max_drawdown = drawdown;
            }
        }

        Ok(-max_drawdown) // Return as negative value
    }

    pub async fn get_budgets(&self) -> Result<Vec<Budget>> {
        let rows = sqlx::query!(
            "SELECT id, category_encrypted, amount, spent, period FROM budgets"
        ).fetch_all(&self.pool).await?;

        let mut budgets = Vec::new();
        for row in rows {
            let category = self.security.decrypt(&row.category_encrypted, &self.encryption_key)?;
            
            budgets.push(Budget {
                id: row.id,
                category,
                amount: row.amount,
                spent: row.spent,
                period: row.period,
            });
        }
        
        Ok(budgets)
    }

    pub async fn set_budget(&self, budget: &Budget) -> Result<()> {
        let encrypted_category = self.security.encrypt(&budget.category, &self.encryption_key)?;
        
        sqlx::query!(
            "INSERT OR REPLACE INTO budgets (id, category_encrypted, amount, spent, period, updated_at) 
             VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
            budget.id,
            encrypted_category,
            budget.amount,
            budget.spent,
            budget.period
        ).execute(&self.pool).await?;
        
        Ok(())
    }

    pub async fn backup_database(&self, backup_path: &str) -> Result<()> {
        sqlx::query(&format!("VACUUM INTO '{}'", backup_path))
            .execute(&self.pool).await?;
        Ok(())
    }

    pub async fn verify_integrity(&self) -> Result<bool> {
        let result = sqlx::query("PRAGMA integrity_check")
            .fetch_one(&self.pool).await?;
        
        let integrity: String = result.get(0);
        Ok(integrity == "ok")
    }
}
