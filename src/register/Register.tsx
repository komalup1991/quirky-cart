import React, { useState } from 'react';
import * as registerApi from './registerApi';
import { useNavigate,Link } from "react-router-dom";


const Register = () => {
    const [user, setUser] = useState({ username: "", password: "", firstName: "", lastName: "", role: "", email: ""});
    const navigate = useNavigate();
    const register = async () => {
    try {
      const status = await registerApi.register(user);
      if (status === 200) {
        console.log("User registered");
        navigate("/Profile");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const login = async () => {
    navigate("/Login");
  };


  return (
    <div>
      <h1>Register</h1>
      <div>
        <label>Username:</label>
        <input value={user.username} onChange={(e) => setUser({
    ...user, username: e.target.value })} />
      </div>
      <div>
        <label>Password:</label>
        <input value={user.password} onChange={(e) => setUser({
    ...user, password: e.target.value })} />
      </div>
      <div>
        <label>First Name:</label>
        <input value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value })} />
      </div>  
      <div>
        <label>Last Name:</label>
        <input value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value })} />
      </div>
      <div>
        <label>Role:</label>
        <input value={user.role} onChange={(e) => setUser({...user, role: e.target.value })} />
      </div>
      <div>
        <label>email:</label>
        <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value })} />
      </div>
      <div>
        <button onClick={register}> Register </button>
      </div>
      <div>
        <button onClick={login}> Login </button>
      </div>
    </div>
  );
};

export default Register;
