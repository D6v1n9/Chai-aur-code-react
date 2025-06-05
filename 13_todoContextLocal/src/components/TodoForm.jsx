import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    // Define the state for single todo
    const [todo, setTodo] = useState("")

    // Since it is form and ther must be add functionality 
    // So to access the add functionality without prop drilling you can use useTodo hook which have already used useContext 

    const {addTodo} = useTodo()
    
    const add = (e) => {
        e.preventDefault()

        if(!todo) return 

        // addTodo(todo)  // It is wrong      
        // addTodo({id: Date.now(), todo: todo, completed: false}) // Correct but you have already passed id in add function so dont need to pass it here 
        addTodo({todo: todo, completed: false}) 
    }
    

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} // This is only known as wiring
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;