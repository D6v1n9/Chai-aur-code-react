import {configureStore} from "@reduxjs/toolkit"
// Now go and create the todoSlice.js
// After complition of reducer inside todoSlice.js you can import them here

//You're just importing that default export and giving it a name todoReducer.
// Its just an Alias (https://chatgpt.com/share/68428549-e168-8007-be08-6f0ac9d5be7a)
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
    reducer: todoReducer
})