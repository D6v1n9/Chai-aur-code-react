import React, { useState } from "react";
import UserContext from "./context";


// Using the concept similar to Outlet for dynamic routing by keeping Header and Footer same
// Similar to Outlet --> children thus help you to pass the props as it is 
// Not generic to use children as its name you can name it something else but as a good convection use children
const UserContextProvider = ({children}) => {

    // Now inside UserContext.Provider you will have to pass a value to which the children will have access to 
    
    const [user, setUser] = useState(null) // or React.useState(null)
    // Now pass value as a prop inside the UserContext.Provider as a Object which can contain any number of values
    // So all API calls and other work here only and pass them to the value prop in provider

    // We are passing user and setUser so that during Login we can directly access setUser to add value in state of user
    // Thus accessing the setUser in Login.jsx
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider