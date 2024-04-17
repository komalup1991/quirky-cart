import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import AllProducts from './products/AllProducts';
import SingleProductDetail from './products/SingleProductDetail';
import Register from './auth/Register';
import Login from './auth/Login';
import ShoppingCart from './cart/ShoppingCart';
import Payment from './payment/Payment';
import PaymentSuccess from './payment/PaymentSuccess';

const App = () => {
  const user = true;  // Assuming 'user' should be inside the component. If not, move it outside.

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/products/:category" element={<AllProducts />} />
        <Route path="/product/:id" element={<SingleProductDetail />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

