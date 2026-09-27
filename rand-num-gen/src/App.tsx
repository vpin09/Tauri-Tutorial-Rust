import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

function App() {
  const [max , setMax] = useState("100");
  const [min , setMin] = useState("1");
  const [result , setResult] = useState<number | null>(null);
  const [error, setError]=useState("")
  async function generate() {

    setResult(null);
    setError("");

   try {
     const response =await invoke<number>("generate" , {min : Number(min), max:Number(max)});
     setResult(response)
   } catch (error) {
    setError(String(error)) 
   }
   
  }

  return(
    <div>
      <h1>
        Random Number generator
      </h1>
      <input value={min} type="number" onChange={(e)=> setMin(e.target.value)} placeholder="Minimum"/>
      <input value={max} type="number" onChange={(e)=> setMax(e.target.value)} placeholder="maximum"/>
      <button onClick={generate}>Generate</button>

       {result &&
      <h2>Result: {result}</h2>
    }
    {error &&
      <p>
        Error :{error}
      </p>
    }


    </div>
  )

}

export default App;
