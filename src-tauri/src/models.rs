use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Transaction {
    pub id: String,
    pub description: String,
    pub amount: f64,
    pub date: String,
    pub category: String,
    pub account: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Budget {
    pub id: String,
    pub category: String,
    pub amount: f64,
    pub spent: f64,
    pub period: String, // "monthly", "weekly", etc.
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BalancePoint {
    pub date: String,
    pub balance: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FinancialMetrics {
    pub balance: f64,
    pub burn_rate: f64,
    pub runway: f64,
    pub itt: f64, // Income Tension Index
    pub volatility: f64,
    pub drawdown: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ImportResult {
    pub success: bool,
    pub imported_count: i32,
    pub duplicate_count: i32,
    pub error_count: i32,
    pub errors: Vec<String>,
}
