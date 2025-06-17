import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store"
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout} from './components'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AllPosts from "./pages/Allposts"
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"
import Post from "./pages/Post"


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/Signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:<Post/>
      }
    ]
  }
])
// Why not <AuthLayout> for /post/:slug?
// Because:
// This is a public route: It shows a post that anyone (logged in or not) can read.
// There’s no need to wrap it in <AuthLayout>, since access isn’t restricted.

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </StrictMode>,
)
