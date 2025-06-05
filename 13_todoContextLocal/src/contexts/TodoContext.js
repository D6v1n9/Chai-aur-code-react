import {createContext, useContext} from "react"

export const TodoContext = createContext({
    //Similar to themeMode: "light"  but this time passing an array 
    todos: [
        {
            id:1,
            todo: "Todo msg",
            completed: false     //Checked or unchecked
        }
    ],
    addTodo: (todo) => {}, // We will write the functionality in App.jsx
    updateTodo: (id, todo) => {},  
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}