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
    if(counter< 20) {
      setCounter(counter+1)
      // setCounter(counter+1)
      // setCounter(counter+1)    //No update in value as bundler will send it only once thus only 1 increment
      // setCounter have a callBack with recievs the last value of counter
      setCounter((prevCounter)=>(prevCounter+1)) // Syntax 1
      setCounter(prevCounter => prevCounter+1) // Syntax 2  JS basic
      
      //https://youtu.be/tOYkV6Yhrhs?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&t=339
    }
  }
  function decreaseValue() {
    if(counter > 0) {
      setCounter(counter-1);
    }
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
