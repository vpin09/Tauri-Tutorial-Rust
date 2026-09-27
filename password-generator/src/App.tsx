import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";




function App() {
  const [length, setLength]=useState("16");

  const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbol, setSymbol]=useState(true);

  const [password, setPassword]=useState("");
  const [error, setError]=useState("")

  async function generatePassword() {
    setPassword("");
    setError("");

    try {
      const response = await invoke<string>("generate_password",{
        length: Number(length),
    uppercase: uppercase,
    lowercase: lowercase,
    numbers: numbers,
    symbols :symbol,
      });
      setPassword(response);   
    } catch (error) {
      setError(String(error));   
    }  
  }

  return(

    <div>
      <h1>Password generator</h1>

      <div>
        <label>Password length</label>
        <input type="number" min="1" value={length} onChange={(e)=> setLength(e.target.value)} />
      </div>
      <br />

      <div>
        <label>
          <input type="checkbox" checked = {lowercase} onChange={(e)=> setLowercase(e.target.checked)}/>
          Lowercase
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked = {uppercase} onChange={(e)=> setUppercase(e.target.checked)}/>
        Uppercase
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked = {numbers} onChange={(e)=> setNumbers(e.target.checked)}/>
          Numbers
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked = {symbol} onChange={(e)=> setSymbol(e.target.checked)}/>
          Symbol
        </label>
      </div>
      <button onClick={generatePassword}>
        Generate Password
      </button>

      {password && (
        <h2>{password}</h2>
      )}

      {error && (
        <p>Error: {error}</p>
      )}


    </div>



  )



  
  
}

export default App;
