// To check the functionality of Provider for Sending data
import React from "react";
import { useState, useContext } from "react";
import UserContext from "../context/context.js"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Now use useContext hook for getting data form Provider
    // inside useContext pass the Context you created 
    // setUser is the value which pass passed inside the value attribute of UserContext.Provider in UserContextProvider.jsx
    // The reason we passed setUser so that we can add the value in user throug Login
    // And we are able to access the setUser thorugh the Context UserContext as it has value user, setUser inside it 
    // (However we only chosed the value we require) 
    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    };
    /*
    ⚠️ Just a Small Note (Best Practice)
        - Usually, it's not recommended to store passwords in context or frontend state. For real-world apps:
        - Never store plain passwords.
        - Use authentication tokens (like JWT) after verifying credentials via a backend API.
        - Only store minimal and safe user info in context (e.g., username, email, role).
    */
    return (
        <div>
        <h1>Login</h1>
        <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input 
            type="text" 
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}    
        />
        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Login;
