use tauri::{command, State};
use crate::{AppState, database::DatabaseManager};
use anyhow::Result;

#[command]
pub async fn unlock_app(password: String, state: State<'_, AppState>) -> Result<bool, String> {
    let mut is_locked = state.is_locked.lock().unwrap();
    let mut db_guard = state.db.lock().unwrap();
    
    match DatabaseManager::new(&password).await {
        Ok(db_manager) => {
            *db_guard = Some(db_manager);
            *is_locked = false;
            Ok(true)
        }
        Err(e) => {
            *is_locked = true;
            Err(format!("Mot de passe incorrect: {}", e))
        }
    }
}

#[command]
pub async fn lock_app(state: State<'_, AppState>) -> Result<(), String> {
    let mut is_locked = state.is_locked.lock().unwrap();
    let mut db_guard = state.db.lock().unwrap();
    
    *db_guard = None;
    *is_locked = true;
    
    Ok(())
}

#[command]
pub async fn is_locked(state: State<'_, AppState>) -> Result<bool, String> {
    let is_locked = state.is_locked.lock().unwrap();
    Ok(*is_locked)
}
