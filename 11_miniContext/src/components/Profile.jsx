//Same as Login but now you have to get the data so get it from the user 
// which was passed inside the Object in the value attribute of the UserContext.Provider 

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

export default Profile