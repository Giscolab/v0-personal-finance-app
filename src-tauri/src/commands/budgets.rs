use tauri::{command, State};
use crate::{AppState, models::Budget};
use anyhow::Result;

#[command]
pub async fn get_budgets(state: State<'_, AppState>) -> Result<Vec<Budget>, String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            // Implementation for get_budgets
            Ok(vec![])
        }
        None => Err("Application verrouillée".to_string())
    }
}

#[command]
pub async fn set_budget(budget: Budget, state: State<'_, AppState>) -> Result<(), String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            // Implementation for set_budget
            Ok(())
        }
        None => Err("Application verrouillée".to_string())
    }
}
