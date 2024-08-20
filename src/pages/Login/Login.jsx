import React, { useState } from 'react';
import './Login.css';
import logo from "../../assets/logo.png";
import { login, signUp } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'

export const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userAuth = async (event)=> {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In"){
      if (!email || !password){
        alert("Email and password are required")
        return;
      }
      await login (email, password);
    }else{
      if (!name || !email || !password){
        alert("Name, email, and password are required")
        return;
      }
      await signUp(email, password,name)
    }
    setLoading(false);
  };

  return (
        loading? <div className="login-spinner">
            <img src={netflix_spinner} alt="" />
                      </div> : 
        <div className='login'>
            <img src={logo} alt=""  className='login-logo'/>
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                  {signState === "Sign Up" ? 
                  <input type="text" placeholder='Your name' value={name} onChange={(e)=>{setName(e.target.value )}}/>
                   : <></>}
                    
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value )}}/>
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button onClick={userAuth} type='submit' >{signState}</button>
                    <div className='form-help'>
                        <div className='remember'>
                              <input type="checkbox" />
                              <label htmlFor="">Remember me</label>
                        </div>
                        <p>Need help?</p>
                    </div>
                </form>
                <div className="form-switch">
                {signState === "Sign In" ? 
                  <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up</span></p> 
                  : <p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In</span></p>
                }
                </div>
            </div>
        </div>
  );
 };

 export default Login;

