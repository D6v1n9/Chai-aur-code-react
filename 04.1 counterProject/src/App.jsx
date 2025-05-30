import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  // Withour hook

  // let counter = 12 ;

  // function increaseValue() {
  //   counter = counter+1;
  //   document.getElementById('incButton').innerHTML = `Increase Counter : ${counter}`;
  // } 
  // // Without useState Hook i have to do this function thing every time to reflect the changes 

  // // useState Hook provide functionality that is reflects the changes (react to the changes in DOM) at multiple places
  // // without doing document.get....


  // With hook

  let [counter, setCounter] = useState(12);

  function increaseValue() {
    // counter = counter+1;
    // setCounter(counter);
    setCounter(counter+1);
  }
  function decreaseValue() {
    setCounter(counter-1);
  }

  return(
    <>
      <h1>Counter project</h1>
      <h3>Counter: {counter}</h3>
      <button onClick={increaseValue}>Increase Counter : {counter}</button>
      <br />
      <button onClick={decreaseValue}>Decrease Counter : {counter}</button>
    </>
  )
}

export default App
