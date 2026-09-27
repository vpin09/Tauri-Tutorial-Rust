import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";


function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [operation, setOperation]=useState("")
  const [error, setError] = useState("");


  async function calculate () {
    setResult(null);
    setError("");

    try {
        const response= await invoke<number>("calculate", {number1 : Number(number1), number2 : Number(number2), operation : operation})
    setResult(response);
      
    } catch (error) {
      setError(String(error))      
    }

  
  }

  return(
    <div>
      <h1> Calculator</h1>
      <input type="number" value={number1} onChange={(e)=>setNumber1(e.target.value)} placeholder="Number 1"/>
      <select value={operation} onChange={(e)=> setOperation(e.target.value)}>
        <option value=""></option>
        <option value="add"> + </option>
        <option value="subtract"> - </option>
        <option value="multiply"> * </option>
        <option value="divide"> / </option>
         <option value="modulo"> % </option>
      </select>
      <input type="number" value={number2} onChange={(e)=>setNumber2(e.target.value)} placeholder="Number 2"/>
      <button onClick={calculate}>Calculate</button>
      {result!=null && (
        <h2>Result : {result}</h2>
        )}
        {error && (
          <p>Error:{error}</p>
        )

        }


    </div>
  )

  
}

export default App;
