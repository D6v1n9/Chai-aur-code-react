import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import User from './components/User/User'
import Github, { githubInfoLoader } from './components/Github/Github'

// There are two methods to create router
// Method-1
// - Using createBrowserRouter from react-router-dom which have an Array
// - Inside array we need as Object
// const router = createBrowserRouter([
//   {
//     path:'/',   // What is the path element will be rendered
//     element: <Layout/>, // Inside this element if you want to add further childrens like Home, AboutUs, ContactUs then add children attribute
//     // As Children contains properties thus make it array for nesting routing
//     children:[
//       {
//         path:"", // Home element
//         element:<Home/>
//       },
//       {
//         path:"about",
//         element:<About/>
//       },
//       {
//         path:"contact-us",
//         element:<Contact/>
//       }
//     ],

//   }
// ])

// Method-2

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact-us' element={<Contact/>}/>
      <Route path='user/:userId' element={<User/>}/>
      <Route 
        loader={githubInfoLoader}
        path='github' 
        element={<Github/>}
        />
    </Route>
  )
)

// As we are using React Router thus no need to render App.jsx

createRoot(document.getElementById('root')).render(
    // RouterProvider requires a prop for working 
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  //Now we need to create router function using 
)
