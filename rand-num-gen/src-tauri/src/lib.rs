// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use rand::{self, RngExt};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn generate(min :i32, max :i32)-> Result<i32, String> {
    if min > max{
        return Err("Minimum can not be greator than Maximum".to_string());
    } 
    let mut rnd=rand::rng();

    let number= rnd.random_range(min..=max);
    Ok(number)


}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
