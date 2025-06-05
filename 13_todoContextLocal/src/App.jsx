import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

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
    setTodos((prev) =>[{id: Date.now(), ...todo},...prev])
  }
  const updateTodo = (id, todo) =>{
    setTodos((prev) => 
      prev.map((prevTodo) => 
        (prevTodo.id === id ? todo:prevTodo)))
  }
  const deleteTodo = (id) => {
    // Which satisfies the condition inside filter are the result
    setTodos((prev) => 
      prev.filter((todo) => 
        todo.id !== id))
  }

  // Most important functionality to mark the todo done thus check them
  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
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
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* As we will Loop through each TodoItem thus passing todo as a prop in component */}
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) =>(
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
