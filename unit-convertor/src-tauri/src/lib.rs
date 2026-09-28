// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/


#[tauri::command]
fn unit_convert(value :f64, conversion: String
)-> Result<f64, String> {
    match conversion.as_str() {
        "km_to_miles" => Ok(value * 0.621371),
        "miles_to_km"=> Ok(value / 0.621371),
        "kg_to_pound"=> Ok(value * 2.20462),
        "pound_to_kg"=> Ok(value/2.20462),
        _ => Err("Invalid conversion".to_string())
    }

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![unit_convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
