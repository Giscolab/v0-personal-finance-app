use tauri::{command, State};
use crate::{AppState, models::Transaction};
use anyhow::Result;

#[command]
pub async fn get_transactions(limit: Option<i32>, state: State<'_, AppState>) -> Result<Vec<Transaction>, String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            db.get_transactions(limit).await
                .map_err(|e| format!("Erreur lors de la récupération des transactions: {}", e))
        }
        None => Err("Application verrouillée".to_string())
    }
}

#[command]
pub async fn add_transaction(transaction: Transaction, state: State<'_, AppState>) -> Result<(), String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            db.add_transaction(&transaction).await
                .map_err(|e| format!("Erreur lors de l'ajout de la transaction: {}", e))
        }
        None => Err("Application verrouillée".to_string())
    }
}

#[command]
pub async fn update_transaction(transaction: Transaction, state: State<'_, AppState>) -> Result<(), String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            // Implementation for update_transaction
            Ok(())
        }
        None => Err("Application verrouillée".to_string())
    }
}

#[command]
pub async fn delete_transaction(id: String, state: State<'_, AppState>) -> Result<(), String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            // Implementation for delete_transaction
            Ok(())
        }
        None => Err("Application verrouillée".to_string())
    }
}
