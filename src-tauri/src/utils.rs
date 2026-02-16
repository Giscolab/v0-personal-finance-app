use chrono::{DateTime, Utc, NaiveDateTime};
use anyhow::Result;

pub fn parse_date(date_str: &str) -> Result<String> {
    // Parse various date formats from imported files
    Ok(date_str.to_string())
}

pub fn detect_file_format(content: &str) -> String {
    if content.starts_with("OFXHEADER") {
        "OFX".to_string()
    } else if content.contains("!Type:") {
        "QIF".to_string()
    } else if content.contains(",") {
        "CSV".to_string()
    } else {
        "UNKNOWN".to_string()
    }
}

pub fn sanitize_amount(amount_str: &str) -> Result<f64> {
    let cleaned = amount_str
        .replace(",", ".")
        .replace(" ", "")
        .replace("€", "")
        .replace("$", "");
    
    cleaned.parse::<f64>()
        .map_err(|e| anyhow::anyhow!("Failed to parse amount: {}", e))
}
