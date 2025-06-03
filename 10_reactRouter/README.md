## Step 1
- Create components folder with sub folder as Header, Footer and Home
- Create respective JSX file in it (Why JSX ? - As it is returning something)
- Install React Router package
- ### Header
- ```javascript 
    import { Link, NavLink } from "react-router-dom";
    // Inside main.jsx 
    import { BrowserRouter } from 'react-router-dom';

    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>,
    )
    ```
- ***anchor tag or `<a href=''>` tag is not used in React as it refreshes the whole page which is not the concept of react, that's why Link tag `<Link to=''>` is used in react which is imported from react-router-dom***

- #### Inside Nav Link tag ([Lec timestamp](https://youtu.be/VJov5QWEKE4?t=892))
    - className attribute of NavLink tag have a direct access to a variable ---> isActive

    - The isActive variable match with the URL and let you know about the is active or not `isActive ? true: false`

    - eg: 
    ``` javascript 
            <NavLink to='/' //On the basis of to isActive will find wether active or not
                className={({isActive}) =>
                    `block py-2 pr-4 pl-3 
                    ${isActive ? "text-orange-700":"text-gray-700"}
                    border-b
                    border-gray-100 
                    hover:bg-gray-50 
                    hover:text-orange-700 lg:p-0`
                }
            > Home </NavLink>
    ```
            
- ### Crearing Dynamic rendering between Header and Footer (Routing)
    - Create Layout.jsx (You can also do the same in App.jsx)
    - Now go to main.jsx to use Layout.jsx 
    - #### Layout
        - For Dynamic Rendering
        - For this 
        ```import Outler from react-router-dom```
        - Outlet uses this Layout as base and Outlet tag will be Dynamic
        - ``` javascript
            import { Outlet } from "react-router-dom";
            // Outlet uses this Layout as base and Outler tag will be Dynamic

            function Layout() {
                return (
                    <>
                        <Header/>
                            <Outlet/>
                        <Footer/>
                    </>
                )
            }

            export default Layout
        
    - #### Main.jsx
        - We will set routes end point 
        - Method - 1
            - Using createBrowserRouter from react-router-dom which have an Array, Inside array we will have object with path and element
            - ```javascript
                const router = createBrowserRouter([
                {
                    path:'/',   // What this path will render we tell by element
                    element: <Layout/>, // Inside this element if you want to add further childrens like Home, AboutUs, ContactUs then add children attribute
                    // As Children contains properties thus make it array for nesting routing
                    children:[
                    {
                        path:"", // Home element
                        element:<Home/>
                    },
                    {
                        path:"about",
                        element:<About/>
                    }
                    ],

                }
                ])


                // Method-2
                const router = createBrowserRouter(
                createRoutesFromElements(
                    <Route path='/' element={<Layout/>}>
                        <Route path='' element={<Home/>}/>
                        <Route path='about' element={<About/>}/>
                        <Route path='contact-us' element={<Contact/>}/>
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
                ```

    - #### User 
        - Create component as User.jsx
        - Add the route to user in Main.jsx
        - ```javascript
            const router = createBrowserRouter(
                createRoutesFromElements(
                    <Route path='/' element={<Layout/>}>
                        <Route path='' element={<Home/>}/>
                        <Route path='about' element={<About/>}/>
                        <Route path='contact-us' element={<Contact/>}/>
                        <Route path='user/:userId' element={<User/>}/>
                    </Route>
                )
            )
            ```
        - Now acces the param useId in User.jsx
        - ```javascript
            import { useParams } from          "react-router-dom";
            // useParam will help you get the exact param 

            function User() {
                const {userId} = useParams()
                // user the exact same Name of param give in the route
                return (
                    <>
                        <h1>User :{userId}</h1>
                    </>
                )
            }
            ```

    - #### Github
        - **Method-1**
            - Create componenet and Route for github
            - Now use github API for github followers and avatar, As the API is need to be call as component render thus use useEffect hook and to reflect the followers and pic in UI use useState hook
            - ```javascript
                function Github() {

                const [data, setData] = useState([]);

                useEffect(() => {
                    fetch("https://api.github.com/users/hiteshchoudhary")
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        setData(res)
                    });
                }, []);

                return (
                    <div className="bg-gray-500 text-3xl text-blue-50">
                    Github followers : {data.followers}
                    <img src="{data.avatar_url}" alt="Git picture" width={300}/>
                    </div>
                );

                }
                ```
        - **Method-2** 
            - Using Reactrouter Dynamic Segments (**loader**)
            - **Loader**
                - Using this you can make direct Api call from the Router component inside Main.jsx
                - Optimization is done as we Hover on the link before clicking it, It will start API data fetching even before useEffect() and stored  in cach (**Interesting**)
                - Inside Loader either you can directly fetch or call a method 
                - Better practice can be you can use another file for the method 
                    ```javascript
                    // Inside createBrowserRoute in Main.jsx
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                        loader: ({ request }) =>
                        fetch("/api/dashboard.json", {
                        signal: request.signal,
                        }),
                    }
                    // Method-2
                    {
                        path: "login",
                        element: <Login />,
                        loader: redirectIfUser,
                    }
                    
                    ```
                - In this case we have created method within Gituhb.jsx file for easy access
                - ```javascript
                    import { useLoaderData } from "react-router-dom";

                    fucntion Github() {
                        const data = useLoaderData();
                        return (
                            <div className="bg-gray-500 text-3xl text-blue-50">
                            Github followers : {data.followers}
                            <img src="{data.avatar_url}" alt="Git picture" width={300}/>
                            </div>
                        );
                    }
                    export const githubInfoLoader = async () => {
                    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
                    return response.json();
                    }
                ```
        

### [Lec Summary](https://youtu.be/VJov5QWEKE4?t=3526)
