import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

function App() {
  const [error, setError]=useState("")
  const[value, setValue]=useState("")
  const [conversion,setConversion]=useState("")
  const [result, setResult]=useState<number | null>(null)
 
async function unit_convert() {

  setError("");
  setResult(null)

  try {
    const response= await invoke<number>("unit_convert", { value : Number(value), conversion: conversion})
    setResult(response)
    
  } catch (error) {

    setError(String(error))
    
  }
  
}
return(
  <div>
    <h1>Unit Convertor </h1>

    <label >
      <input type="number" onChange={(e)=> setValue(e.target.value)}  placeholder="enter value for conversion"/>
    </label>
    <br />
    <select value={conversion} onChange={(e)=> setConversion(e.target.value)}>
      <option>select option</option>
      <option value="km_to_miles" >KM ={'>'} Miles</option>
      <option value="miles_to_km">Miles ={'>'} KM</option>
      <option value="kg_to_pound">KG = {'>'} Pound</option>
      <option value="pound_to_kg">Pound = {'>'} KG</option>
    </select>

    <button onClick={unit_convert}>Convert</button>

    {result && (
      <h2>Result : {result}</h2>
    )}
    {error &&
    (
      <p>Error :{error}</p>
    )}



  </div>
)

}

export default App;
