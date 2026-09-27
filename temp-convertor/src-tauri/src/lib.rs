// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
fn convert_temperature(temp : f64, from :String)->Result<f64, String>{
    match from.as_str() {
        "celsius"=> Ok((temp *9.0 / 5.0)+32.0),
        "farnhiet" => Ok( (temp- 32.0)*5.0/9.0),
        "kelvin"=> Ok(temp + 273.15),
        _ => Err("Invalid Temperataure unit".to_string())
       
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![convert_temperature])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
