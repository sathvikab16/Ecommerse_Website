import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
     <ToastContainer position="top-right" autoClose={1000} />
  </CartProvider>
);
