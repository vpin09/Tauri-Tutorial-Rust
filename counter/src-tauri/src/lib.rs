// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use  std::sync::Mutex;

use tauri::State;

struct AppState{
    count: Mutex<i32>
}
#[tauri::command]
fn increment(state: tauri::State<'_, AppState>)->i32{
    let mut count=state.count.lock().unwrap();
    *count+=1;
    *count
}

#[tauri::command]
fn decrement(state: tauri::State<'_, AppState>)->i32{
    let mut count=state.count.lock().unwrap();
    *count-=1;
    *count
}
#[tauri::command]
fn reset(state: tauri::State<'_,AppState>)->i32 {
    let mut count =state.count.lock().unwrap();
    *count = 0;
    *count
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default().manage(AppState{
        count: Mutex::new(0)
    })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![increment,decrement, reset])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
