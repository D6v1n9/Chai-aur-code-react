import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import {store} from "./app/store"
// Remember to how to export and import store you have to use {} 


// Similar to context you have to give the provider and as a prop instead of value pass store 
// Insider store the variable is also store which we created in store.js 
// You only have to wrap the components inside provider can also do the same in App.jsx

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
