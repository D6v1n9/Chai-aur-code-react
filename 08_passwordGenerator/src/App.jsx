import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowrd] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef(): useRef is a React Hook that lets you reference a value that’s not needed for rendering.
  const passwordRef = useRef(null);


  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  // const cachedFn = useCallback(fn, dependencies)
  // dependecies are on which the function re-renders it self :- passed as an array --> [dep1, dep2, ...]
  /*
    Usage
     - Skipping re-rendering of components
     - Updating state from a memoized callback
     - Preventing an Effect from firing too often
     - Optimizing a custom Hook
*/

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=[]{}`~";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]);

  // const copyPasswordToClipboard = () => {
  //   window.navigator.clipboard.writeText(password);    // will work no issue but not optimal
  // }

  const copyPasswordToClipboard = useCallback(()=>{
    console.log(passwordRef.current)
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])

  // ##NOTE the dependency in useCallback are for Optimization whereas the dependencies in
  // useEffect are that if the changes the will run the callback in useEffect

  // password or you can also pass setPassword these are for optimization 
  // as useCallback use the concept of memoization thus give one dependency where the value is 
  // being set 

  /*
  useCallback will re function if any value changes in the dependencies
  React will not call your function. 
  The function is returned to you so you can decide when and whether to call it.

  passwordGenerato(); // Error you cannot call it as you cannot control the rendering it 
                      // is controled by react itself by setValue 

  Thus using useEffect we call that function

  useEffect is a React Hook that lets you synchronize a component with an external system.
  Syntax: useEffect(setup, dependencies?)
  any changes is dependencies the setup callback will run again.
  As in our example the passwordGenerator will be called by useEffect() and 
  setPassword() will render this on screen
  
  */

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) 

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-2 border border-rose-50"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
            <input
              type="checkbox"
              value={numberAllowed}
              onChange={() => {
                setNumberAllowrd((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
