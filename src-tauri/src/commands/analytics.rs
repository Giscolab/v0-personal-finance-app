use tauri::{command, State};
use crate::{AppState, models::{FinancialMetrics, BalancePoint}};
use anyhow::Result;

#[command]
pub async fn get_financial_metrics(state: State<'_, AppState>) -> Result<FinancialMetrics, String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            db.get_financial_metrics().await
                .map_err(|e| format!("Erreur lors du calcul des métriques: {}", e))
        }
        None => Err("Application verrouillée".to_string())
    }
}

#[command]
pub async fn get_balance_history(days: i32, state: State<'_, AppState>) -> Result<Vec<BalancePoint>, String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            db.get_balance_history(days).await
                .map_err(|e| format!("Erreur lors de la récupération de l'historique: {}", e))
        }
        None => Err("Application verrouillée".to_string())
    }
}
