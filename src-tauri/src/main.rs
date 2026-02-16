#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod database;
mod security;
mod commands;
mod models;
mod utils;

use tauri::{Manager, State};
use std::sync::Mutex;
use database::DatabaseManager;
use security::SecurityManager;

pub struct AppState {
    pub db: Mutex<Option<DatabaseManager>>,
    pub security: Mutex<SecurityManager>,
    pub is_locked: Mutex<bool>,
}

fn main() {
    tauri::Builder::default()
        .manage(AppState {
            db: Mutex::new(None),
            security: Mutex::new(SecurityManager::new()),
            is_locked: Mutex::new(true),
        })
        .invoke_handler(tauri::generate_handler![
            commands::auth::unlock_app,
            commands::auth::lock_app,
            commands::auth::is_locked,
            commands::transactions::get_transactions,
            commands::transactions::add_transaction,
            commands::transactions::update_transaction,
            commands::transactions::delete_transaction,
            commands::budgets::get_budgets,
            commands::budgets::set_budget,
            commands::analytics::get_financial_metrics,
            commands::analytics::get_balance_history,
            commands::import::import_file,
        ])
        .setup(|app| {
            // Initialize security manager and check for existing database
            let app_handle = app.handle();
            let state: State<AppState> = app_handle.state();
            
            // Auto-lock timer setup will be handled in the frontend
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
