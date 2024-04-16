import React from 'react'
import Home from './home/Home'
import AllProducts from './products/AllProducts'
import SingleProductDetail from './products/SingleProductDetail'
import Register from './auth/Register'
import Login from './auth/Login'
import ShoppingCart from './cart/ShoppingCart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Payment from './payment/Payment'
import PaymentSuccess from './payment/PaymentSuccess'
  const App = () => {
      // return <Home/>;
  // return <AllProducts/>;
  // return <SingleProductDetail/>;
  // return <Register/>;
  // return <Login/>;
  // return<ShoppingCart/>;
    return (
      <BrowserRouter>
        <Routes>  
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  

export default App