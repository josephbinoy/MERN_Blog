import React, {useState} from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom"
import loginRequest from "../API/loginRequest"
import { useContext } from 'react';
import TokenContext from '../user/TokenContext.js';

export default function LoginPage() {
  const [, setToken]=useContext(TokenContext);
  const navigate = useNavigate();
  const [loginFail, setLoginFail]=useState(false);
  const [user, setUser]=useState({
    username:"",
    password:""
  });

  function handleLogin(e){
    e.preventDefault();
    loginRequest(user).then((res)=>{
      setToken(res.data);
      navigate("/");
    }).catch((err)=>{
      setLoginFail(true);
      setUser({
        username:"",
        password:""
      })
      console.log(err)
    })
  }

  function handleChange(e){
    const newValue=e.target.value;
    const caller=e.target.name;
    setLoginFail(false);
    setUser((prevValue)=>{
      return {
      ...prevValue,
      [caller]:newValue
    }
  })
  }

  return (
    <>
      <Navbar />
      <div className="login_container">
        <h1>Hi! Please Login</h1>
        {loginFail&&<p>Login Failed! Try again</p>}
        <form className="loginForm" onSubmit={handleLogin} method="post" action="/login">
          <div className="label_div"><label>Username</label></div>
          <input className="loginInput" onChange={handleChange} type="text" placeholder="Enter Username" name="username" value={user.username} />
          <div className="label_div"><label>Password</label></div>
          <input className="loginInput" onChange={handleChange} type="password" placeholder="Enter Password" name="password" value={user.password} />
          <button type="submit" className="loginButton">Submit</button>
        </form>
      </div>
    </>
  );
}