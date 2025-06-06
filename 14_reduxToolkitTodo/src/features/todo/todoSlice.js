import {createSlice, nanoid} from '@reduxjs/toolkit';

// nanoid :- used for generating unique id
// Create the initialState for store it can do anythig like fetching data from database and kept inside it 
// Intial state can be either Array or Object depends on you

const initialState = {
    todos:[{id: 1, text: "Hello world"}]
}

// Slice : Unformally bigger version of Reducer (reducer is a functinality)
// We created slice and exported it (we can create multiple slice)
// createSlice method take object in it 
export const todoSlice = createSlice({
    name: "todo",
    initialState, //or intialState:{todo:[{}]} 
    reducers: {    //This Object contains properties and functions
        addTodo: (state, action)=>{ //#NOTE : In redux toolkit we also define not like context only declaration of function
            const todo = {
                id: nanoid(), // Earlier Date.now()
                text: action.payload // payload itself a Object so you can access it
            }
            state.todos.push(todo);
        },  //#NOTE : We always have access to state and action inside the function defination
        removeTodo: (state, action)=>{
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        }, 
        updateTodo: (state, action)=>{
            state.todos = state.todos.map((todo) => (
                todo.id === action.payload ? {...todo, text: action.payload}: todo
            ))
        }
    }
}) 
// state variable give the access to the intialState current status
// action provide the required values eg: for removing todo id is required it will be given by action

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions
// This export will be used inside the component

// Now for the store export all the reducers somehow in this application there is only one reducer
// This line exports the reducer function (internally created by createSlice) as the default export from the file.
export default todoSlice.reducer