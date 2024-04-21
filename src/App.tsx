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
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

// Import admin components
import Topbar from './components/adminComponents/Topbar';
// import Sidebar from './components/Sidebar';
// import UserList from './admin/UserList';
// import User from './admin/User';
// import NewUser from './admin/NewUser';
// import ProductList from './admin/ProductList';
// import Product from './admin/Product';
// import NewProduct from './admin/NewProduct';



const App = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const userDetail = useSelector((state: RootState) => state.user);
  console.log("user: ", JSON.stringify(user));
  console.log("userAdmin: " + user?.role);

  const isAdmin = user && user.role === 'admin';



  return (
    <BrowserRouter>
      <Routes>
        
        {isAdmin && (
          <>
          <Route path="/" element={<Topbar />} />
          {/* <Route path="/admin" element={<Topbar />} />            
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />   */}
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<AllProducts />} />
        <Route path="/product/:id" element={<SingleProductDetail />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/logout" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
