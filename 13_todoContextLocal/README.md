## Step 1
- Create contexts folder with TodoContext.js
### TodoContext.js
-  ```javascript
    import {createContext, useContext} from "react"

    export const TodoContext = createContext({
        //Similar to themeMode: "light"  but this time passing an array 
        todos: [
            {
                id:1,
                todo: "Todo msg",
                complete: false     //Checked or unchecked
            }
        ],
        addTodo: (todo) => {},
        updateTodo: (id, todo) => {},
        deleteTodo: (id) => {},
        toggleComplete: (id) => {}
    })


    export const TodoContextProvider = TodoContext.Provider

    export const useTodo = () => {
        return useContext(TodoContext)
    }
    ```
- Create **index.js** file inside contexts folder to collectivily export all
    -   ```javascript
        import { TodoContext, TodoProvider, useTodo } from "./TodoContext";

        export { TodoContext, TodoProvider, useTodo };
        ```


### App.jsx
- Wrap the content in TodoProvider and passed the value attribute
- Value attribute can be passed in two ways
    - Object destructuring
        - ```javascript
            value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}
            ```

        - ```javascript
            <TodoProvider value={{
            todos: TodoContext.todos,
            addTodo: TodoContext.addTodo
            }}>
            ```

- Writing the methods and using the useState and useEffect hook
- Using localStorage (pass items in string)
    - getItem(key)
    - setItem(key, value)
- ```javascript
    import { TodoProvider } from "./contexts";

    function App() {
    const [todos, setTodos] = useState([]);
    // <TodoProvider value={{
    //   todos: TodoContext.todos,
    //   addTodo: TodoContext.addTodo
    // }}>
    // {{todos, addtodo}} using Object destructuring


    // Working of Methods (Function name will be same)

    const addTodo = (todo) => {
        // You need the access of all prev todos and then add the new todo
        setTodos((prev) =>[{id: Date.now(), ...todo},{...prev}])
    }
    const updateTodo = (id, todo) =>{
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo:prevTodo)))
    }
    const deleteTodo = (id) => {
        // Which satisfies the condition inside filter are the result
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    // Most important functionality to mark the todo done thus check them
    const toggleComplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, complete: !prevTodo.complete}: prevTodo))
    }

    // As are application load we want the old todos saved in local storage thus use useEffect
    // Only issue with the use of localStorage is that it gives data as string
    // In getItem from localStorage only pass the key you will get the value you set in localStorage.setItem() in key, value
    useEffect(() =>{
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos && todos.length > 0) {
        setTodos(todos)
        }
    }, [])
    // You can also create multiple useEffect 
    // The below useEffect is for -> if there is any change in any todo then it will setItem in local storage
    // While setItem you have to give the values in string
    // Inside setItem pass as key, value and both in string 
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todos))
    }, [todos])

    return (
        <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
                Manage Your Todos
            </h1>
            <div className="mb-4">{/* Todo form goes here */}</div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
            </div>
            </div>
        </div>
        </TodoProvider>
    );
    }

    ```

### TodoForm.jsx (component)
- ```javascript
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
    ```