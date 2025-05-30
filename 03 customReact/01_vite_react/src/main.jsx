import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'

function MyApp() {
  return (
    <div>
      <h1>Custom App | chai </h1>
    </div>
  )
}

// const reactElement = {
//     type: 'a',
//     props: {
//         href: 'https://google.com',
//         target: '_blank'
//     },
//     children: 'Click to visit google'
// };


// <MyApp/>   ---> MyApp()  ---> return single element   ----> Element breakdown -----> which is then rendered

const anotherElement = (
    <div>
      <a href="https://google.com" target='_blank'>Visit google</a>
      <br />                                                              
      <a href="https://google.com" target='_blank'>Visit google</a>
    </div>
)   

const anotherUser = "chai aur react"

// At the end the function returns an element is converted intp react element and then its virtual DOM renders it 
const reactElement = React.createElement(     // To use React.createElement you have to import React from 'react'
    'a',
    {href: 'https://google.com',target: '_blank' },
    'click me to visit google',
    anotherUser     // anotherUser is used inside {} thus you cannot directly write statement, thus expression is written
    // another user is evaluated expression 
  )



ReactDOM.createRoot(document.getElementById('root')).render(

    // <MyApp/>
    // MyApp()   //Not prefered as by convention you have to code with whole company
    // reactElement   // Will not work as there is specific syntax inside React

    // anotherElement // Works perfectly but if you dont use div then error as React can only work in a single element
    reactElement 
)
