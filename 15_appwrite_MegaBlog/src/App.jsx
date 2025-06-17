import React, { useState, useEffect } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice"
import {Header, Footer} from "./components"
import {Outlet} from "react-router-dom"
import './App.css'


function App() {
  // #NOTE good practice
  // Now create a state loading as there may take time for netwrok request like in this case 
  // requesting from appwrite may take time 
  // The loading state will help you conditional rendering (if-else) like if loading is true than show loading icon
  
  const [loading, setLoading] = useState(true) // Usually we do true 
  // intially true as when we will use useEffect we will do our data fetch and 
  // inside that we will set the loading to false 

  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData})) // Passed as an object because action creator expects a payload
        } else {                      // short form of {userData: userData} the key is placed as action.payload.userData
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error('Appwrite auth error:', error)
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  // Conditional Rendering 
  // Method-1
  // if(loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   )
  // }

  // return (
  //   <div>
      
  //   </div>
  // )

  // Method-2
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
          {/* Outlet */}
        {/* TODO:  <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
