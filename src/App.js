import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function App() {

  const [coffeeName, setCoffeeName] = useState("")
  const [amountCoffee, setAmountCoffee] = useState(0)
  const [coffeeList, setCoffeeList] = useState([])
  const [newName, setNewName] = useState("")

  const addToCart = () =>{
    Axios.post("http://localhost:3001/insert",{
      names: coffeeName,
      amount: amountCoffee
    })
  }

  const updateCoffee = (id) =>{
    Axios.put("http://localhost:3001/update", {
      id: id,
      newName: newName
    })
  }

  const deleteCoffee = (id) =>{
    Axios.delete(`http://localhost:3001/delete/{$id}`)
  }

  useEffect(() =>{
    Axios.get("http://localhost:3001/list").then((response)=>{
      setCoffeeList(response.data)
    })
  }, [])


  return (
    <div className="App">
      <h1>CRUD Test Coffee</h1>
      <label>Coffee Name</label>
      <input type="text" name="coffeeName" onChange={(event) => {setCoffeeName(event.target.value)}}></input>
      <label>Amount</label>
      <input type="number" name="amountCoffee" onChange={(event) => {setAmountCoffee(event.target.value)}}></input>
      <button onClick={addToCart}>Add to Cart</button>

      <h1>List Coffee</h1>
      {coffeeList.map((val, key) => {
        return <div key={key}>
          <h1>{val.coffeeName}</h1>
          <h1>{val.amountCoffee}</h1>
          <input type="text" placeholder='New Coffee' nChange={(event) => {setNewName(event.target.value)}}></input>
          <button onClick={() => updateCoffee(val.id)}>Update</button>
          <button onClick={() => deleteCoffee(val.id)}>Delete</button>
          </div>
      })}
      </div>
  );
}

export default App;
