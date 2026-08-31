import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios"

const Login = ({ setshowlogin }) => {
  const {url,setToken} = useContext(StoreContext)
  const [currstate, setcurrstate] = useState("Login");

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {  
    const name = event.target.name;
    const value = event.target.value;
    setdata(prevData => ({ ...data, [name]: value }));
  };

   const onLogin = async(event)=>{
    event.preventDefault()
    let newUrl = url;
    if(currstate ==="Login"){
      newUrl+="/api/user/login"
    }else{
       newUrl +="/api/user/register"
    }

    try{
    const response  = await axios.post(newUrl,data);
    if(response.data.success){
     setToken(response.data.token);
     localStorage.setItem("token",response.data.token);
     setshowlogin(false)
    }else{
      alert(response.data.message)
    }

   }catch(error){
    console.log("Error with login/register request",error);
    alert("An error occured.Please try again");
   }
  };
 


  return (
    <div className='login-pop'>
      <form onSubmit={onLogin} className='login_container'>
        <div className="login_title">
          <h2>{currstate}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className="login_inputs">
      
          {currstate === 'Login' ? null :(
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Enter Your Name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Enter Your Email'
            required
          />
          <input
            name='password'
            type='password'
            onChange={onChangeHandler}
            value={data.password}
            placeholder='Your Password'
            required
          />
        </div>
        <button type='submit'>
          {currstate === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login_condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        {currstate === "Login" ? (
          <p>Create an account? <span onClick={() => setcurrstate("Sign Up")}>Click Here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setcurrstate("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
}

export default Login;
