import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

function App() {
  const [temperature, setTemperature] = useState("");
  const [from, setFrom]=useState("celsius");
  const [result, setResult]=useState("");
  const [error, setError]=useState("")

  async function convert() {
    setResult("")
    setError("")
    try {

      const response= await invoke<number>("convert_temperature", {
        temp : Number(temperature), from : from
      })
      setResult(response.toFixed(2));
      
    } catch (error) {
      setError(String(error))
    }

  }
  return(
    <div>
      <h1>Temperature Convertor</h1>
      <input type="number" value={temperature} onChange={(e)=> setTemperature(e.target.value)} placeholder="enter temperature"/>
      <select value={from} onChange={(e)=> setFrom(e.target.value)}>

        <option value="celsius"> Celsius -{'>'} Farnhiet </option>
        <option value="farnhiet"> Farnhiet -{'>'} Celsius </option>
        <option value="kelvin"> Celsius -{'>'} Kelvin </option>

      </select>
      <button onClick={convert}>Convert</button>

      { result && (
        <h2> Result : {result}</h2>
      )
      }
      {
        error && (
          <p>Error: {error}</p>

        )
      }

    </div>
  )
 
}

export default App;
