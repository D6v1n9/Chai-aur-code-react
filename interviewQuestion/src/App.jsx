import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

// The concept is that as there will be change in any of the state whole component will remount 
// https://youtu.be/P4X0vPTQX4A?si=69MPJCfdB7hndWUD

function App() {
  console.log("App rendered", Math.random());
  const [value, setValue] = useState({
    value: 0,
  })
  
  
  //const [multipliedValue, setMultipliedValue] = useState(1)
  //let multipliedValue = value * 5

  // const multiplybyfive = () => {
  //   //setMultipliedValue(value * 5)
  //   setValue(value + 1)
  // }

  const clickMe = () => {
    setValue({
      value: 0,
    })
  }

  return (
    <>
      <h1>Main value: {value.value} </h1>
      <button
      onClick={clickMe}
      >Click to multiply by 5</button>
      {/* <h2>Multiplied value: {multipliedValue} </h2> */}
    </>
  )
}

export default App


// The below one i did 

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
  
//   const [count, setCount] = useState(1);
//   const [prevCont, setPrevCount] = useState(1);

//   const handleClick = () => {
//     setCount((prev) => {
//       setPrevCount(prev)
//       return prev*5
//   });
//   }

//   return (

//     <>
//       <button onClick={handleClick}>
//           count :  {prevCont}
//       </button>
//       <p> {count}</p>
//     </>
//   )
// }

// export default App
