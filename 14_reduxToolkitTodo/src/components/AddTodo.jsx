import React, { useState } from "react";
import {useDispatch} from "react-redux"
import {addTodo} from "../features/todo/todoSlice"

function AddTodo() {
    const [input, setInput] = useState("")
    //AddTodo you have to add something in the store thus need to dispatch or send 
    // Need to use useDispatch
    const dispatch = useDispatch()
    
    // Dispatch uses the reducer to do changes in the store
    const addTodoHandler = (e) => {
        e.preventDefault()
        // Inside the dispatcher you have to call the reducer
        dispatch(addTodo(input)) //Inside this action.payload has been used but now you can only pass the input 
        setInput('') // Just for user experience after todo is added the input field is cleared
    }

  return (
    <>
      <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
        <input
          type="text"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Enter a Todo..."
          value={input}
          onChange={(e)=>(setInput(e.target.value))}
        />
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Add Todo
        </button>
      </form>
    </>
  );
}

export default AddTodo;
