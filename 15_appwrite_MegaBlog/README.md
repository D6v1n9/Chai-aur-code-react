## Getting app dependencies
- For redux
    - @reduxjs/toolkit
    - react-redux
- For routing 
    - react-router-dom
        -  React Router DOM: This package includes everything in React Router and adds a few DOM-specific APIs that are necessary for web applications. It provides components like <BrowserRouter>, <HashRouter>, <Link>, and <NavLink> that are tailored for web development.
- For formating in text like bold, italic etc
    - @tinymce/tinymce-react
    - As we are storing content in HTML so to render this we need to use package 
        - html-react-parser
- To handle forms (Mainly used when real time update in slug and content would be not possible by state)
    - react-hook-form

- Using appwrite 

## Creating env variable
Always visit the documentation
- In create-react-app [documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/)
    - You must create custom environment variables beginning with REACT_APP_.
    - To access process.env.REACT_APP_
- In vite [documentation](https://vite.dev/guide/env-and-mode.html)
    - To prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_`
    -   ```
        import.meta.env.VITE_SOME_KEY
        ```

### Steps in production dev
- Create .env file and add it to .gitignore
- Create conf or config folder in src
    - Create conf file which helps you get the env variable access in short way without import.meta.env.VITE_
    -   ```javascript
        const conf = {
            appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
            appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
            appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
            appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
            appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
        }
        // there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

        export default conf
        ```

## Setting up appwrite [Lec link](https://youtu.be/4_JlIr8yry0?t=1261)

## Appwrite Auth service
- Create a folder appwrite as there will be multiple services
- Create a file auth.js
- ### Basic setup [documentation](https://appwrite.io/docs/products/auth/email-password)
    - ```javascript
        import { Client, Account, ID } from "appwrite";

        const client = new Client()
            .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
            .setProject('<PROJECT_ID>');                 // Your project ID

        const account = new Account(client);

        const user = await account.create(
            ID.unique(), 
            'email@example.com', 
            'password'
        );
        ```
- ### Inside Auth.js as better code practice
    - This code can be used as a Setup code always when working with the production level with appwrite
    - ```javascript
        import conf from '../conf/conf.js'; // To get the access to env variables

        import { Client, Account, ID } from "appwrite";

        // M-1
        // export class AuthService {}
        // export default AuthService
        // Inside this method we exported the class thus when using this we have to create an Object and use it  
        // M-2 // Better approch to create an object and export this object so when we use it we can directly access the class methods
        export class AuthService {
            client = new Client();
            account;
            // We are not directly writing by .setEndpoint() and .setProject() will be waste of resources
            // After creation of object we want this functions to work thus call them inside constructor
            constructor() {
                this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
                this.account = new Account(this.client);
                    
            }
            async createAccount({email, password, name}) {
                try {
                    const userAccount = await this.account.create(ID.unique(), email, password, name);
                    if (userAccount) {
                        // call another method
                        return this.login({email, password});
                    } else {
                    return  userAccount;
                    }
                } catch (error) {
                    throw error;
                }
            }

            async login({email, password}) {
                try {
                    return await this.account.createEmailSession(email, password);
                } catch (error) {
                    throw error;
                }
            }

            async getCurrentUser() {
                try {
                    return await this.account.get();
                } catch (error) {
                    console.log("Appwrite serive :: getCurrentUser :: error", error);
                }

                return null;
            }

            async logout() {

                try {
                    await this.account.deleteSessions(); // So that he get logout from all places 
                    // Another method is deleteSession('current') // To log out current session ## THE DIFFERENCE is session and sessions extra 's'
                } catch (error) {
                    console.log("Appwrite serive :: logout :: error", error);
                }
            }
        }


        const authService = new AuthService(); // authService is an Object
        export default authService
        // As you have export the Object so now you can access all the functions/ async functions with dot operator
        // If in future any Backend service gets changes than only cahnges in this file to make ```
- ### Inside config.js (appwrite database serivce)
    - [CRUD documentation](https://appwrite.io/docs/references/cloud/client-web/databases)
    - [Queries documentation](https://appwrite.io/docs/products/databases/queries)
    - [File related documentation](https://appwrite.io/docs/references/cloud/client-web/storage)
    -   ```javascript
        import conf from '../conf/conf.js';
        import { Client, ID, Databases, Storage, Query } from "appwrite";

        export class Service {
            client = new Client();
            databases;
            bucket;

            constructor(){
                this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
                this.databases = new Databases(this.client);
                this.bucket = new Storage(this.client);
            }
            // slug is passed for unique post
            // Reason for creating this function is that if in future we shoft from appwrite to other
            // service so we can make changes to these function 
            // If you remember to add any othre feature just pass into attribute of function and pass it in createDocument()

            async createPost({title, slug, content, featuredImage, status, userId}) {
                try {
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status,
                            userId
                        }
                    )
                } catch (error) {
                    console.log("Appwrite serive :: createPost :: error", error);
                }
            }
            
            async updatePost(slug, {title, content, featuredImage, status}) {
                try {
                    return await this.databases.updateDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug,
                        {
                            title,
                            content,
                            featuredImage,
                            status
                        }
                    )
                } catch (error) {
                    console.log("Appwrite serive :: updatePost :: error", error);
                }
            }

            async deletePost(slug) {
                try {
                    await this.databases.deleteDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug
                    )
                    return true
                } catch (error) {
                    console.log("Appwrite serive :: deletePost :: error", error);
                    return false
                }
            }

            async getPost(slug){
                try {
                    return await this.databases.getDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug
                    )
                } catch (error) {
                    console.log("Appwrite serive :: getPost :: error", error);
                    return false
                }
            }

            // Need to use query in appwrite as we want only those posts which have active status
            async getPosts() {
                try {
                    return await this.databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        [
                            Query.equal("status", "active")
                        ]
                        
                    )
                } catch (error) {
                    console.log("Appwrite serive :: getPosts :: error", error);
                    return false
                }
            }

            // File upload service 
            // upload file will return the file ID and it will be used in CreatePost by passing
            // file ID in featuredImage
            async uploadFile(file){
                try {
                    return await this.bucket.createFile(
                        conf.appwriteBucketId,
                        ID.unique(),
                        file
                    )
                } catch (error) {
                    console.log("Appwrite serive :: uploadFile :: error", error);
                    return false
                }
            }
            
            async deleteFile(fileId){
                try {
                    await this.bucket.deleteFile(
                        conf.appwriteBucketId,
                        fileId
                    )
                    return true
                } catch (error) {
                    console.log("Appwrite serive :: deleteFile :: error", error);
                    return false
                }
            }

            getFilePreview(fileId){
                return this.bucket.getFilePreview(
                    conf.appwriteBucketId,
                    fileId
                )
            }

        }
        const service = new Service()
        export default service
        ```

## Using Redux toolkit
- Create store folder with store.js
- For authentication create authSlice.js
- ### authSlice.js
    - ```javascript
        import {createSlice} from "@reduxjs/toolkit"

        const initialState = {
            status: false,
            userData: null
        }

        // Assignment - create a slice for posts -> allPosts, userPosts... etc. 

        export const authSlice = createSlice({
            name: "auth",
            initialState,
            reducers: {
                login: (state, action) => {
                    state.status = true;
                    state.userData = action.payload.userData
                },
                logout: (state) => {
                    state.status = false
                    state.userData = null
                }
            }
        })

        export const {login, logout} = authSlice.actions;

        export default authSlice.reducer
        ```

    - ### Assigment create a slice for posts

## Authentication to be done in App.js
- ### The main role of App.jsx is to:
    - Manage global app layout (Header, Footer, main content via Outlet).
    - Check user authentication state on load using Appwrite.
    - Show a loading indicator while waiting for the auth status.
    - Dispatch login/logout to Redux to keep global auth state updated.
- [Why to use dispatch(logout())](https://grok.com/share/c2hhcmQtMg%3D%3D_39145833-6284-4b3d-b5d2-de67bc5e198c)
- Do a setup of Provide in main.jsx so that you can run your project
- ```javascript
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
            Outlet
            {/* TODO:  <Outlet /> */}
            </main>
            <Footer />
        </div>
        </div>
    ) : null
    }

    export default App
    ```

## Creating of components
- Create container folder with container.jsx
- Container is always created in projects and is common for all elements 
- *As you create component remember to export them and import in index.js inside component*
- ### container.jsx
    - ```javascript
        import React from "react";

        function Container({children}) {
            // return (
            //     <div className='w-full max-w-7xl mx-auto px-4'>
            //         {children}
            //     </div>
            // )

            // You can also return when you have only a line 
            return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
        }
        ```
- ### Footer.jsx
    - Only have css and `<Link/>`
    - ```javascript
        import { Link } from "react-router-dom";
        import Logo from "../Logo";
        ```

- ### LogoutBtn.jsx
    - ```javascript
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
        ```
- For LogoutBtn wheter to show it on Hearder or not based on the user if he is authenticated
- ### Header.jsx
    - [Alternate method not imp to see](https://grok.com/share/c2hhcmQtMg%3D%3D_464b1a84-ab5b-49ba-9607-fbe8e8c5bdef)
    - NavLink and useNavigate are two important utilities provided by the React Router library to manage navigation in a React application. While both serve the purpose of navigation 
    - On NavLink you have to click but useNavigate can be called as a function happens and will navigate to a page example Login.jsx
    - ```javascript
        import React from "react";
        import { Container, Logo, LogoutBtn } from "../index";
        import { Link } from "react-router-dom";
        import { useSelector } from "react-redux";
        import { useNavigate } from "react-router-dom";

        function Header() {
        const authStatus = useSelector((state) => state.auth.status);

        // Insted of writing multiple Link tag in return statement you can create an array of objects and then loop through it
        // ## Remeber the HTML element which repeat to that you have to attach the key thus only to <li> and not to <ul>

        const navigate = useNavigate(); // Instead of using <NavLink> you can directly use useNavigate and pass the endpoint
        // eg: onClick={()=>navigate("/about")}
        const navItems = [
            {
            name: "Home",
            slug: "/", // You can also name it URL its just a Object nothing big
            active: true,
            },
            {
            name: "Login",
            slug: "/login",
            active: !authStatus,
            },
            {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
            },
            {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
            },
            {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
            },
        ];

        return (
            <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                <div className="mr-4">
                    <Link to="/">
                    <Logo width="70px" />
                    </Link>
                </div>
                <ul className="flex ml-auto">
                    {navItems.map((item) =>
                    item.active ? (
                        <li key={item.name}>
                        <button
                            className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                            onClick={() => navigate(item.slug)}
                        >
                            {item.name}
                        </button>
                        </li>
                    ) : null
                    )}
                    {authStatus && (
                    <li>
                        <LogoutBtn />
                    </li>
                    )}
                </ul>
                </nav>
            </Container>
            </header>
        );
        }

        // You can also do the authStatus check by doing this
        // if (authStatus) {
        //     items.push(
        //         <li key="logout">
        //             <LogoutBtn />
        //         </li>
        //     );
        // }

        export default Header;
        ```
- ## Production based creation of component
- ### Button.jsx
    - ```javascript
        import React from "react";

        function Button({
        children, // this have the text
        type = "button", // This can be like submit, button is just the default value if nothing is passed
        bgColor = "bg-blue-600",
        textColor = "text-white",
        className = "",
        ...props
        }) {
        return (
            <button className={`px-4 py-2 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
            </button>
        );
        }

        export default Button;
        ```
- ### Input.jsx
    - ```javascript
        import React, { useId } from "react";

        function Input({
        label, // For username or password, For what is that input for 
        type = "text",    // Password type or anything
        className = "",
        ref, // pull in the ref
        ...props // everything else
        }) {
        const id = useId();

        //htmlFor={id} binds the label to the input with id={id}.  Not so neccesary you can remove it also

        return (
            <div className="w-full">
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                ref={ref}
                {...props}
                className={`
                px-3 py-2 rounded-lg bg-white text-black 
                outline-none focus:bg-gray-50 duration-200 
                border border-gray-200 w-full ${className}
                `}
            />
            </div>
        );
        }

        export default Input;
        ```

- ### Select.jsx
    - ```javascript
        import React, { useId } from 'react';

        // This is a dropdown to select the options 

        //## NOTE: Looping through the options should be done conditional if there is no value the 100% your app will crash as on map there will be no value to access
        // {options?.map()}  or you can also use if-else
        function Select({ 
            options,        // Options by default gives you array so loop through them 
            label, 
            className = '', 
            ref, 
            ...props 
        }) {
        const id = useId();

        // ...props can be (e.g., name, onChange, disabled, required, aria-label) or custom event handlers,

        return (
            <div className="w-full">
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1">
                {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            >
                {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
            </div>
        );
        }

        export default Select;
        ```
- ### PostCard.jsx
    - ```javascript
        import React from 'react'
        import appwriteService from "../appwrite/config"
        import {Link} from 'react-router-dom'

        // The id from appwriteService is recived as $id

        function PostCard({$id, title, featuredImage}) {
            
        return (
            <Link to={`/post/${$id}`}>
                <div className='w-full bg-gray-100 rounded-xl p-4'>
                    <div className='w-full justify-center mb-4'>
                        <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />

                    </div>
                    <h2
                    className='text-xl font-bold'
                    >{title}</h2>
                </div>
            </Link>
        )
        }


        export default PostCard
        ```

- ### Login.jsx : Login form will take different component inside it like button, input etc. and will learn to use useForm from React-hook-form
    - ```javascript
        import React, {useState} from 'react'
        import {Link, useNavigate} from 'react-router-dom'
        import { login as authLogin } from '../store/authSlice'
        import {Button, Input, Logo} from "./index"
        import {useDispatch} from "react-redux"
        import authService from "../appwrite/auth"
        import {useForm} from "react-hook-form"


        function Login() {
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const {register, handleSubmit} = useForm();
            // About handleSubmit
            // When you use handleSubmit in React with react-hook-form, you attach it to your form's submit event. 
            //This function automatically takes care of things like checking for errors and gathering all the form data, 
            //so you don't have to worry about manually updating the form's state. All you need to do is define
            // what should happen when the form is successfully submitted.  Done by creating login function

            // About register
            // when they are used spread them -> {...register("name", {})} 
            const [error, setError] = useState("");

            const login = async(data) => {
                setError("") // If on past submit there may be an error so just clear the erro state for safe side
                try {
                    const session = await authService.login(data);
                    if(session) {
                        const userData = await authService.getCurrentUser()
                        if(userData) {
                            dispatch(authLogin(userData))
                            navigate("/");
                        }
                    }
                } catch (error) {
                    setError(error.message);
                }
            }

            return (
                <div className='flex items-center justify-center w-full'>
                    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                        <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%"/>
                            </span>
                        </div>

                        <h2 className="text-center text-2xl font-bold leading-tight">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-base text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                        <form onSubmit={handleSubmit(login)} className='mt-8'>
                            <div className='space-y-5'>
                                <Input
                                    label="Email :"
                                    plaeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                        }
                                    })}
                                />
                                <Input
                                    label="Password :"
                                    plaeholder="Enter your password"
                                    type="password"
                                    {...register("password", {
                                        required: true,

                                    })}
                                />
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            )
        }

        export default Login
        ```
- ### Signup.jsx
    - ```javascript
        import React,{useState} from "react";
        import { useDispatch } from "react-redux";
        import {useForm} from "react-hook-form"
        import { Link, useNavigate } from "react-router-dom";
        import { login as authLogin } from "../store/authSlice";
        import authService from "../appwrite/auth";
        import {Button, Input, Logo} from "./index"

        function Signup() {
            const [error, setError] = useState("")
            const dispatch = useDispatch();
            const navigate = useNavigate();
            const {register, handleSubmit} = useForm()

            const create = async(data) => {
                setError=""
                try {
                    const session = await authService.createAccount(data)
                    if(session) {
                        const userData = await authService.getCurrentUser()
                        if(userData) {
                            dispatch(authLogin(data))
                            navigate("/")
                        }
                    }
                } catch (error) {
                    setError(error.message)
                }
            }
            return (
                <div className="flex items-center justify-center">
                    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                        <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px]">
                                <Logo width="100%"/>
                            </span>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                        <p className="mt-2 text-center text-base text-black/60">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                        <form onSubmit={handleSubmit(create)}>
                            <div className='space-y-5'>
                                <Input
                                    label="Full Name: "
                                    placeholder="Enter your full name"
                                    {...register("name", {
                                        required:true
                                    })}
                                />
                                <Input
                                    label="Email: "
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                        }
                                    })}
                                />
                                <Input
                                    label="Password: "
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required:true
                                    })}
                                />
                                <Button type="submit" className="w-full">
                                    Create Account
                                </Button>   
                            </div>
                        </form>

                    </div>

                </div>
            )
        }

        export default Signup
        ```
- ### IMPORTANT component mostly used : AuthLayout.jsx
    - It tells how to protect pages and routes
    - It is a protected container
    - [useEffect and if-else condition and dependency array (*grok-ai*)](https://grok.com/chat/370dfb93-a2d3-4d3d-b7d1-47a7a5dcb60f)
    - 1. ### How ref is Working in the Provided Code
            - **Context in react-hook-form**
            The useForm hook from react-hook-form provides a register function, which is used to register form inputs (like email and password) with the form's state management.
            When you spread the register function into an input (e.g., {...register("email", { required: true, ... })}), it returns an object containing several properties, including:
            ref: A reference to the DOM input element, which react-hook-form uses to track the input's value, validate it, and manage focus or other DOM-related behaviors.
            onChange, onBlur, etc.: Event handlers to capture user interactions and update the form state.
    - ```javascript
        import React, { useEffect, useState } from "react";
        import {Link, useNavigate} from "react-router-dom"
        import {useDispatch, useSelector} from "react-redux"

        // You only check on the basis of authStatus so not compulsory to pass the prop authentication
        export default function Protected({children, authentication=true}) {
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const [loader, setLoader] = useState(true);

            const authStatus = useSelector((state) => (state.auth.status))

            useEffect(() => {
                if(authentication && authStatus !== authentication) {
                    navigate("/login")
                } else if(!authentication && authStatus !== authentication) {
                    // authentication is false and authStatus is true
                    navigate("/")
                }
                setLoader(false)
                
            }, [authStatus, navigate, authentication])

            return loader ? <h1>Loading...</h1> : <>{children}</>

        }

        ```

- ### RTE.jsx (Real Time Editor)
    - [Editor from TinyMCE documentation](https://www.tiny.cloud/my-account/integrate/#react)
    - Understanding RTE [grok link](https://grok.com/chat/3d49f5bc-68d9-4c49-8489-4d066bd4f829)
    - ```javascript
        // This is from documentation 
        import React from 'react';
        import { Editor } from '@tinymce/tinymce-react';

        export default function App() {
        return (
            <Editor
            initialValue="Welcome to TinyMCE!"
            apiKey='tyomczsm4lfsm0ydcdxgq4oezuvcurqgld6de0ly3bf7buil'
            init={{
                plugins: [
                // Core editing features
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                // Your account includes a free trial of TinyMCE premium features
                // Try the most popular premium features until Jun 27, 2025:
                'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
            
            />
        );
        }
        ```
- ### PostForm.jsx ---> Will be used mostly
    -   ```javascript
        import React, { useCallback, useEffect }  from "react";
        import {Button, Input, RTE, Select} from "../index"
        import {useForm} from "react-hook-form"
        import appwriteService from "../../appwrite/config"
        import {useNavigate} from "react-router-dom"
        import { useSelector } from "react-redux";

        export default function PostForm({post}) {

            const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
                defaultValues: {
                    // There are two conditino for post form either to create or edit a form thus we are doing query
                    title: post?.title || "",       // if post does not exit it will five undefined instead of throwing error
                    slug: post?.$id || "",
                    content: post?.content || "",
                    status: post?.status || "active",
                }
            })

            const navigate = useNavigate()
            const userData = useSelector((state) => (state.auth.userData))
            const submit = async(data) => {
                if(post) {
                    // Thus have to edit it 
                    const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                    // if file is uploaded then delete the previous file 
                    if(file) {
                        appwriteService.deleteFile(post.featuredImage);
                    }
                    // Now you also have to update the post 
                    const dbPost = await appwriteService.updatePost(post.$id, {
                        ...data,    // Now you have got all the data from the form but have to over write the featuredImage
                        featuredImage: file ? file.$id : undefined
                    })

                    if(dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                } else {
                    // If you dont have post then you have to create one
                    // So you will recieve the image form data that you have to upload on appwrite
                    const file = await appwriteService.uploadFile(data.image[0]);
                    // the id from appwrite is recieved as $id thus in this case it's file.$id
                    if(file) {
                        // if i have uploaded the file i would create a post, for post you need featuredImage id 
                        // Thus your file id is your featuredImage id
                        const fileId = file.$id
                        data.featuredImage = fileId;
                        const dbPost = await appwriteService.createPost( {
                            ...data,
                            userId: userData.$id
                        })

                        if(dbPost) {
                            navigate(`/post/${dbPost.$id}`)
                        }
                    }

                }
            }

            const slugTransform = useCallback((value) => {
                if(value && typeof(value)==="string") {
                    return value
                            .trim() // will remove whitespaces from both end
                            .toLowerCase()
                            .replace(/^[a-zA-Z\d\s]/g, "-")
                            .replace(/\s/g, "-")
                }
                return ""
            }, [])

            useEffect(() => {
                const subscription = watch((value, { name }) => {
                    if (name === "title") {
                        setValue("slug", slugTransform(value.title), { shouldValidate: true });
                    }
                });

                return () => subscription.unsubscribe();
            }, [watch, slugTransform, setValue]);

            return(
                <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                    <div className="w-2/3 px-2">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            className="mb-4"
                            {...register("title", { required: true })}
                        />
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    <div className="w-1/3 px-2">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="mb-4"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-4"
                            {...register("status", { required: true })}
                        />
                        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                            {post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </form>
            )
        }
        ```
- ## Creation of pages
- ### Signup.jsx
    - ```javascript
        import React from "react";
        import {Signup as SignupComponent} from "../components/index"

        function Signup() {
            return (
                <div className="py-8">
                    <SignupComponent/>
                </div>
            )
        }

        export default Signup
        ```
- ### Login.jsx
    - ```javascript
        import React from "react";
        import { Login as LoginComponent } from "../components/index";

        function Login() {
            return (
                <div className="py-8">
                    <LoginComponent/>
                </div>
            )
        }

        export default Login
        ```
- ### AddPosts.jsx
    - ```javascript
        import React from "react";
        import { Container, PostForm } from "../components/index";

        function AddPost() {
            return (
                <div className="py-8">
                    <Container>
                        <PostForm/>
                    </Container>
                </div>
            )
        }

        export default AddPost
        ```
- ### AllPosts.jsx
    - ```javascript
        import React,{useEffect, useState} from "react";
        import appwriteService from "../appwrite/config"
        import { Container, PostCard } from "../components/index";


        function Allposts() {
            const [posts, setPost] = useState([])
            
            useEffect(()=>{
                appwriteService.getPosts([])    // You can pass further queries in getPost([])
                    .then((posts)=>{
                        if(posts) {
                            setPost(posts.documnets)
                        }
                    })
            }, [])

            return (
                <div className="">
                    <Container>
                        <div className="flex flex-wrap">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <PostCard post={post}/>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }

        export default Allposts
        ```
- ### EditPost.jsx
    - ```javascript
        import React, {useEffect, useState} from "react";
        import appwriteService from "../appwrite/config"
        import {Container, PostForm} from "../components/index"
        import { useNavigate, useParams } from "react-router-dom";


        function EditPost() {
            const [post, setPosts] = useState(null)
            const {slug} = useParams()
            const navigate = useNavigate()

            useEffect(() => {
                if(slug) {
                    appwriteService.getPost(slug)
                        .then((post) => {
                            if(post) {
                                setPosts(post)
                            }
                        })
                } else {
                    navigate("/")
                }
            }, [slug, navigate]) 

        //  Why it's there: To satisfy React's useEffect dependency rule and prevent linter warnings.
        //  What happens if you remove it: Likely nothing breaks now, but you'll get an ESLint warning.
        //  Is it functionally necessary? No — navigate doesn’t change between renders.
        //  Best practice? Yes, include it to keep the code clean and avoid warnings.

        return post ? (
                <div className='py-8'>
                    <Container>
                        <PostForm post={post} />
                    </Container>
                </div>
        ) : null
        }

        export default EditPost
        ```
- ### Home.jsx
    - ```javascript
        import React, { useEffect, useState } from "react";
        import appwriteService from "../appwrite/config"
        import {Container, PostCard} from "../components/index"

        function Home() {
            const [posts, setPosts] = useState([])

            useEffect(() => {
                appwriteService.getPosts()
                    .then((posts) => {
                        if(posts) {
                            setPosts(posts.document)
                        }
                    })
            }, [])
            
            if(posts.length === 0) {
                return (
                    <div className="w-full py-8 mt-4 text-center">
                        <Container>
                            <div className="flex flex-wrap">
                                <div className="p-2 w-full">
                                    <h1 className="text-2xl font-bold hover:text-gray-500">
                                        Login to read posts
                                    </h1>
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            }

            // <PostCard post={post} /> // This is also right
            // This will pass the entire post object as a single prop named post. //{ post: { $id, title, featuredImage } }
            // But component is expecting { $id, title, featuredImage }

            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post)=>(
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post}/>     
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }



        export default Home
        ```
- ### Post.jsx
    - ```javascript
        import React, { useEffect, useState } from "react";
        import appwriteService from "../appwrite/config";
        import { useNavigate, useParams } from "react-router-dom";
        import {useSelector} from "react-redux"

        // This is for if you want to view a post you created and it will have edit and delete funtionality

        export default function Post() {
            const [post, setPost] = useState(null);
            const navigate = useNavigate();
            const {slug} = useParams();

            const userData = useSelector((state) => state.auth.userData);
            // To view the post it created user Must be authenicated
            
            // How userData have access to $id figure it out (Please give time to this great way to understand flow)
            const isAuthor = post && userData ? post.userId === userData.$id : false;

            useEffect(() => {
                if(slug) {
                    appwriteService.getPost(slug)
                        .then((post) => {
                            if(post) {
                                setPost(post);
                            }
                            navigate("/");
                        })
                } else {
                    navigate("/");
                }
            }, [slug, navigate])

            const deletePost = () => {
                appwriteService.deletePost(post.$id)
                    .then((status) => {
                        if(status) {
                            appwriteService.deleteFile(post.featuredImage);
                        navigate("/")
                        }
                    })
            }

            return post ? (
                <div className="py-8">
                    <Container>
                        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl"
                            />

                            {isAuthor && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-500" className="mr-3">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button bgColor="bg-red-500" onClick={deletePost}>
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        </div>
                        <div className="browser-css">
                            {parse(post.content)}
                            </div>
                    </Container>
                </div>
            ) : null;
        }
        ```
- ## main.jsx
    - ```javascript
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
        ```

- ## Interview 
    - [Youtube: ForwardRef hook Advance interview](https://youtu.be/BSaYsHVpaK0?t=2011)
    - [useRef article and forwardRef](https://dev.to/sajithpradeep/understanding-the-use-of-useeffect-hook-forwardref-in-react-57jf)
    - ForwardRef is depricating soon [*visit*](https://react.dev/reference/react/forwardRef)
    