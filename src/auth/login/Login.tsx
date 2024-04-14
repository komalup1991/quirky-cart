import React, { useState } from 'react';
import * as loginApi from './loginApi';
import { User } from "../register/registerApi";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({ username: "", password: ""});
    const navigate = useNavigate();
    const login = async () => {
        try {
            const res = await loginApi.login(user);  
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                setUser ({username: "", password: ""});
            } else {
                alert(res.data.message)
            }
          }  catch (e) {
            console.log(e);
          }
        };
  return (
    <div>
        <h1>Login</h1>
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
        <button onClick={login}> Login </button>
        </div>
    </div>
  )
}

export default Login