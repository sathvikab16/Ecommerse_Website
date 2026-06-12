import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from '../components/MainLayout/MainLayout';
import Home from '../Pages/Home/Home';
import Product from '../Pages/Product/Product';
import Cart from '../Pages/Cart/Cart';
import User from '../Pages/User/User';
import Register from "../components/Authentication/Register/Register"
import SignIn from '../components/Authentication/SignIn/SignIn';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import OrderSuccess from '../Pages/OrderSuccess/OrderSuccess';
import UserDetails from '../Pages/UserDetails/UserDetails';

function AppRoute() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/users' element={<User/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/users/:id"  element={<UserDetails/>}/>
         <Route path="/order-success" element={<OrderSuccess/>} />
         

        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        
      </Routes>
     
    </BrowserRouter>
  )
}

export default AppRoute
