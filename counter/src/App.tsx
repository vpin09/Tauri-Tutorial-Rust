import { useState } from "react";

import "./App.css";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [count, setCount]=useState(0);

  async function increment(){
   const result= await invoke<number>("increment")
   setCount(result);
  }

  async function decrement(){
    const result= await invoke<number>("decrement")
    setCount(result);
  }
  async function reset () {
    const result=await invoke<number>("reset");
    setCount(result); 
  }

  return(
    <div>
      <h1>
        Counter
      </h1>
      <h2>{count}</h2>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

  

}

export default App;
