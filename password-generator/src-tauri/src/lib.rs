// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use rand::{RngExt, seq::index};

#[tauri::command]
fn generate_password(
    length: usize,
    uppercase: bool,
    lowercase:bool,
    numbers: bool,
    symbols :bool,
) -> Result<String, String> {

    let mut characters= String::new();

    if uppercase{
        characters.push_str("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    if lowercase{
        characters.push_str("abcdefghijklmnopqrstuvwxyz");
    }
    if numbers{
        characters.push_str("0123456789");
    }
    if symbols{
        characters.push_str("!@#$%^&*()-_=+[]{}");
    }
    if characters.is_empty(){
        return Err("select at least one character type".to_string());
    }
    if length ==0{
        return Err("Password length must be greater than 0".to_string());
    }
    let chars :Vec<char>= characters.chars().collect();
    let mut rng=rand::rng();
    let mut password=String::new();
    for _ in 0..length{
        let index=rng.random_range(0..chars.len());
        password.push(chars[index]);
    }
    Ok(password)

    
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![generate_password])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
