import React from "react";
import { useParams } from "react-router-dom";
// useParam will help you get the exact param 

function User() {
    const {userId} = useParams()
    // user the exact same Name of param give in the route
    return (
        <div className="text-3xl bg-gray-500 p-4 text-white">
            <h1>User: {userId}</h1>
        </div>
    )
}

export default User