import { StrictMode } from 'react'
<<<<<<< HEAD
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
=======
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


ReactDOM.createRoot(document.getElementById('root')).render(
>>>>>>> c1dc7a0b19926638031a31ddcb15ab8ba8f97eb1
  <StrictMode>
    <App />
  </StrictMode>,
)
