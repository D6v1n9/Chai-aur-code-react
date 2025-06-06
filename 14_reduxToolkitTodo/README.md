# 🔁 What is Redux?

**Redux** is a state management library used to manage and centralize application state.
- Redux is an open-source JavaScript library for managing and centralizing application state

---

✅ **In simpler terms**:  
Redux helps you store and manage all your app’s data (state) in one place, making it predictable and easier to debug and test.

---

## ⚛️ What is React-Redux?

**React-Redux** is the official React binding for Redux.

---

✅ **It allows React components to:**
- Access Redux state (`useSelector`)
- Dispatch actions to the store (`useDispatch`)
- Connect Redux with React efficiently

---

💡 You can think of **Redux** as the **engine**, and **React-Redux** as the **bridge** between the engine and your car (**React components**).



## Step-1 : Setting up for Redux    
- Create app folder with store.js (it can be placed any where but inside src )
and import configStore

- Now Create reducer()
    - Create feaures folder with todo folder in it
    - Inside todo create file **todoSlice.js** (By naming convection so that people know you have used Redux toolkit)
    ### todoSlice.js
    - *****createSlice({})*** A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.**

    - Reducers are functions that take the current `state` and an `action` as arguments, and return a `new state` result. In other words, `(state, action) => newState.`

    - This API is the standard approach for writing Redux logic.
    - ```javascript
        import {createSlice, nanoid } from '@reduxjs/toolkit';

        const initialState = {
            todos: [{id: 1, text: "Hello world"}]
        }



        export const todoSlice = createSlice({
            name: 'todo',
            initialState,
            reducers: {
                addTodo: (state, action) => {
                    const todo = {
                        id: nanoid(), 
                        text: action.payload
                    }
                    state.todos.push(todo)
                },
                removeTodo: (state, action) => {
                    state.todos = state.todos.filter((todo) => todo.id !== action.payload )
                },
            }
        })

        export const {addTodo, removeTodo} = todoSlice.actions

        export default todoSlice.reducer
        ```

    ### store.js
    - ```javascript
        import {configureStore} from "@reduxjs/toolkit"
        // Now go and create the todoSlice.js
        // After complition of reducer inside todoSlice.js you can import them here

        import todoReducer from "../features/todo/todoSlice";

        export const store = configureStore({
            reducer: todoReducer
        })
        ```

## Step-2 : Create components
- ### AddTodo.jsx
    - import useDispatch as you have to send data to store
    - Get addTodo reducer from todoSlice.js
    - Create dispatch
- ```javascript
    import React, { useState } from "react";
    import useDispatch from "react-redux"
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
        <form onSubmit={addTodoHandler}className="space-x-3 mt-12">
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
    ```
- ### Todos.jsx
    - ```javascript
        import React from "react";
        import {useDispatch, useSelector} from "react-redux"
        import { removeTodo } from "../features/todo/todoSlice";

        function Todos() {
            // Inside useSelector method you have access to the state 
            // The selector will be called with the entire Redux store state as its only argument.
            // By state you can access all the values from the store
            const todos = useSelector((state)=> state.todos)    // Now const todos holds variable
            const dispatch = useDispatch()
            // Select kro useSelector() se Functionality run karo dispatch se
            return (
                <>
                    <div>Todos</div>
                    {todos.map((todo)=>(
                        <li key={todo.id}>
                            {todo.text}
                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                            >X</button>
                        </li>
                    ))}
                </>
            )
        }

        export default Todos
        ```
## Step-3 insied Main.jsx
- The Provider attachment can also be done in App.jsx
- ### Main.jsx
    ```javascript
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import './index.css'
    import App from './App.jsx'

    import { Provider } from 'react-redux'
    import {store} from "./app/store"
    // Remember to how to export and import store you have to use {} 


    // Similar to context you have to give the provider and as a prop instead of value pass store 
    // Insider store the variable is also store which we created in store.js 
    // You only have to wrap the components inside provider can also do the same in App.jsx

    createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
    )
    ```
## Summary
### [Lec summary link](https://youtu.be/1i04-A7kfFI?t=3674)
### Redux toolkit ki notes
1. **Create Store** - single source of truth
it has configureStore
introduce reducer 
    - Every application have only one store


2. Create Slice(functions) method(createSlice)
Slice has name, initialState, `reducers :{key: function}`
Access of two things (State, action)
state = state value in the store
action = action.payload 
export individual functionality 
export main source export

3. **Add Todo** - Give values to State i.e Dispatch Courier  = use method useDispatch()
 dispatch(addTodo())

4. **Take Values** - useSelector((state) =>state.todos) state ka access chaiye
variable me values lelo ek baar aagaie uske baad pure JS concept hai 


## Task : 
- Create an Edit button and make the text edit such that your input gets converted to update field with the text of the update todo and Add todo button changes to Update todo

- [ChatGpt link to solution](https://chatgpt.com/share/6842d079-fe78-8007-b203-87062946b23a)