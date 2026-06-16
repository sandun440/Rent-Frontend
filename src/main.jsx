import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <App />
  </StrictMode>,
)
