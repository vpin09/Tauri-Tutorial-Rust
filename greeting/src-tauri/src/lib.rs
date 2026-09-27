// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: String, age: u8) -> String {
    let name =name.trim();

    if name.is_empty(){
        return  "Please eneter your name".to_string();
    }
    if name.to_lowercase()=="vipin"{
        return "Hello Vipin Welcome Back to Rust + tauri".to_string();
    }

    format!("Hello, {}! You are {} years old.",name, age)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
