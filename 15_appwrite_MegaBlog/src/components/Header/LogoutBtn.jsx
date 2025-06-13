import React from "react";
import authReducer, { logout } from "../../store/authSlice"
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(() => dispatch(logout()))
        .catch((error) => console.log('Logout error:',error))
    }
    // Whether to show this logout button or not will be done through conditional rendering
    // Throuth Header.jsx by checking whether user is logged in or not 
    // Or you can perform conditional rendering within LogoutBtn.jsx by getting the status from the store using useSelector
    return (
        <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn