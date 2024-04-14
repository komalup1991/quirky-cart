import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './register/Register';
import Login from './login/Login';
import Home from '../home/Home';

const index = () => {
  return (
    <div className="container-fluid">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/Account/Login" />} /> */}
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element ={<Home /> } /> */}
      </Routes>
    </div>
  )
}

export default index