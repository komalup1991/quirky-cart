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
import AdminNavbar from './components/adminComponents/AdminNavbar';
import AdminHome from './admin/adminHome';
import AddProduct from './admin/addProduct';
import AdminSidebar from './components/adminComponents/AdminSidebar';
import AdminAllUsers from './admin/allUsers';
import HandleUsers from './admin/handleUsers';
import AddUser  from './admin/addUser';
import Navbar from './components/Navbar';
import AdminAllProducts from './admin/allProducts';
import HandleProducts from './admin/handleProducts';
import Profile from './user/Profile';
import UpdateProfile from './user/UpdateProfile';




const App = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const userDetail = useSelector((state: RootState) => state.user);
  // console.log("user: ", JSON.stringify(user));
  console.log("userAdmin: " , userDetail.currentUser);

  const isAdmin = user && user.role === 'admin';



  return (
    <BrowserRouter>
      <Routes>
        
        {isAdmin && (
          <>
          
          <Route path="/" element={<AdminHome />} />
          
          <Route path="/addUser" element={<AddUser />} />
             
           <Route path="/users" element={<AdminAllUsers />} />
          <Route path="/user/:userId" element={<HandleUsers />} />
          
          <Route path="/products" element={<AdminAllProducts />} /> 
          <Route path="/product/:productId" element={<HandleProducts />} />
          <Route path="/addProduct" element={<AddProduct />} />   
          </>
        )}
         <Route path="/user/:userId" element={<Profile />} />
         <Route path="/user/update/:userId" element={<UpdateProfile />} />
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
