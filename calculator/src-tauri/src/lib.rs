// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn calculate(number1: f64, number2: f64, operation: String )-> Result<f64, String>{
    match  operation.as_str() {
        "add"=> Ok(number1 +number2),
        "subtract"=> Ok(number1 - number2),
        "multiply"=> Ok(number1 * number2),
        "divide"=> {
            if number2 ==0.0{
                Err("Cannot divide by zero".to_string())
            }else {
                Ok(number1/number2)
            }
        }
        "modulo"=>{
             if number2 ==0.0{
                Err("Cannot divide by zero".to_string())
            }else {
                Ok(number1%number2)
            }
        }
        _ =>Err("Invalid operation".to_string())     
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![calculate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
