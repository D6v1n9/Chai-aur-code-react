// To learn onClick={funciton} or onClick={()=>{}}  #Syntax# 

import { useState } from "react";

function App() {
  const [color, setColor] = useState("#919191");

  function handle(props) {
    const selectedColor = props.target.style.backgroundColor;
    console.log(props.target.style.backgroundColor);
    setColor(selectedColor);
  }

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button
            // onClick={handle} :- Method-1   
            onClick={()=>(setColor("red"))}   //onClick expects you to pass a function
            // onClick={setColor("red")} // Not work as onClick needs a functio not the return value
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          <button
            onClick={handle}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "green" }}
          >
            Green
          </button>
          <button
            onClick={handle}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
