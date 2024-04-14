import {HashRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import { Navigate } from 'react-router-dom';

import Home from "./home/Home";
import Register from "./register/Register";
import React from "react";
import './App.css';

function App() {
  return (
    <HashRouter>
    <div>
    <Routes>
              <Route path="/"         element={<Navigate to="/home"/>}/>
              <Route path="/register"   element={<Register/>}/>
              <Route path="/home" element={<Home/>}/>
    </Routes>
    
    </div>
    </HashRouter>
  );
}

export default App;
