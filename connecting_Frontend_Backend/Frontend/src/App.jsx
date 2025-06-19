import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get("/api/jokes")
      .then((res) =>{
        // console.log(res);
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
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p> 
        </div>
      ))}
    </>
  );
}

export default App;
