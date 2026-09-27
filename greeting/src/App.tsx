import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [message, setMessage] = useState("");


  async function greet() {
    const result= await invoke<string>("greet", { name: name, age: Number(age) });
    setMessage(result);
  }

  return(
    <div>
      <h1>Greet App</h1>
      <div>

        <label> Name:</label>
              <input value={name} onChange={(e)=> setName(e.target.value)}
              placeholder="eneter your name"/>
        <label> Age:</label>
              <input type="number" value={age} onChange={(e)=> setAge(parseInt(e.target.value) )}
              placeholder="enter your age"/>
      </div>
      <button onClick={greet}>Greet</button>
      <h2>{message}</h2>


    </div>



  )

}

export default App;
