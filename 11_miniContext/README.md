### Why context API 

- To Solve the probleum of Prop drilling
- **Prop drilling** in React refers to the process of passing data or state through multiple layers of a component hierarchy, where a parent component passes down data to its children, and those children pass the data down to their own children, continuing this process until the data reaches the component that actually needs it.
- To overcome prop drilling, developers can use the Context API or state management tools like Redux
- For react we use react-Redux
- Easier version of Redux is Readux-toolkit (RTK)

### Step 1
- Create context folder in src
- Create file context.js (Pure js file)
    ```javascript
        import React from "react";
        const UserContext = React.createContext();
        export default UserContext
    ```
- Context is a Provider which provide you with variables
- To use Context as Provider wrap the components inside the Context which will use it as a Global and then can take the access to the state

- #### Method-1 to create provider
    - Create UserContextProvider.jsx file in context 
    - import UserContext which you have created in context.js file
    - The UserContext will be used as a wrapper which will provide with values 
    - As UserContext is a Provider so by its functionality UserContext.Provider
    -   ```javascript
        import UserContext from "./context";
        const UserContextProvider = ({children}) => {

            // Now inside UserContext.Provider you will have to pass a value to which the children will have access to 
            
            const [user, setUser] = useState(null) // or React.useState(null)
            // Now pass value as a prop inside the UserContext.Provider as a Object which can contain any number of values
            // So all API calls and other work here only and pass them to the value prop in provider

            // We are passing user and setUser so that during Login we can directly access setUser to add value in state of user
            return (
                <UserContext.Provider value={{data, setData}}>
                    {children}
                </UserContext.Provider>
            )
        }
        ```
    - Inside the UserContextProvider function you can make the API calls and other global needs and can pass them into value attribute of the Provider as variable inside the Object eg: value={{var1, var2, var3 ...}}

    - Now you can export this as per your need either into App.jsx or main.jsx

### Step-2
- To check provider for accessing data and sending data
- Create components
    - Login.jsx -> for sending data
    - Profile.jsx -> for accessing data
- #### Login.jsx
    - Sending data to User with the help of useContext() hook
    - ```javascript
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
            
        ```
    - ⚠️ Just a Small Note (Best Practice)
        - Usually, it's not recommended to store passwords in context or frontend state. For real-world apps:

        - Never store plain passwords.

        - Use authentication tokens (like JWT) after verifying credentials via a backend API.

        - Only store minimal and safe user info in context (e.g., username, email, role).
- #### Profile.jsx
    - Same as Login but now you have to get the data so get it from the user which was passed inside the Object in the value attribute of the UserContext.Provider 
    - ```javascript
        import React, { useContext } from "react";
        import UserContext from "../context/context";

        function Profile() {
            const {user} = useContext(UserContext)
            
            // Conditional return 
            if(!user) return <div>Please Login</div>

            return (
                <div>Welcome {user.username}</div>
            )
        }
        ```
- App.jsx
    - Now render the Components inside the App.jsx
    - ```javascript
        import './App.css'
        import Login from './components/Login'
        import Profile from './components/Profile'
        import UserContextProvider from './context/UserContextProvider'

        function App() {

        return (
            <UserContextProvider>
                <h1>Context Api with Ice Tea</h1>
                <Login />
                <Profile/>
            </UserContextProvider>
        )
        }
        ```
    - Main Reason of this was to understand How you surpassed a step of passing props by creating a Context 
    - So now you can create Context of different role and whenever required you can access the value from there or you can also store the data of an API there and use it 