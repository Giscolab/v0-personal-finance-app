use tauri::{command, State};
use crate::{AppState, models::ImportResult};
use anyhow::Result;

#[command]
pub async fn import_file(file_path: String, file_type: String, state: State<'_, AppState>) -> Result<ImportResult, String> {
    let db_guard = state.db.lock().unwrap();
    
    match db_guard.as_ref() {
        Some(db) => {
            // Implementation for file import with duplicate detection
            Ok(ImportResult {
                success: true,
                imported_count: 0,
                duplicate_count: 0,
                error_count: 0,
                errors: vec![],
            })
        }
        None => Err("Application verrouillée".to_string())
    }
}
