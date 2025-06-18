import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/jokes")
      .then((res) =>{
        console.log(res);
        setJokes(res.data)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  return (
    <>
      <h1>Chai aur connection</h1>
      <p>Jokes count : {jokes.length}</p>
      {jokes.map((joke) => {
        <div key={joke.id}>
          <h3>{joke.item}</h3>
          <p>{joke.content}</p> 
        </div>
      })}
    </>
  );
}

export default App;
