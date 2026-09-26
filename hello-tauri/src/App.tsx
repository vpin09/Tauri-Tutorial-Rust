import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [message, setMessage] = useState("");

  async function sayHello() {
    const result = await invoke<string>("hello");
    console.log("hello from log");
    
    setMessage(result);
  }

  return (
    <div>
      <h1>Hello Tauri</h1>

      <button onClick={sayHello}>
        Say Hello
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;