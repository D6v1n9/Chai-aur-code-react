import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";

function App() {

  const myObj ={
    name: "Karan",
    age: 21
  }

  return (
    <>
      <h1 className="bg-green-300 rounded-xl text-black p-4 mb-4">Tailwind test</h1>
      <Card username= "chaiAurReact" btnText = "Click Me" passObject = {myObj}/>
      <Card username= "thisIsAnotherUsername" btnText = "Visit Me"/>
    </>
  );
}

/*
  <Card username= "chaiAurReact" btnText = "Click Me" passObject = {myObj}/>

  Now back to basic this Card will be parsed by React and broken into customObject like that of 
  Anchor tag in customReact project 
  Thus comparing the last element in Object was a variable and you cannot directly pass JS 
  inside that you have to pass it in form of Executable JS '{}' inside curly brases

*/

export default App;
