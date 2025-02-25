import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/ApiPath';
const LoginForm = ({showWelcomeHandler}) => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const loginHandler=async(e)=>{
  e.preventDefault();

  try {
     const response=await fetch(`${API_URL}/vendor/login`
          ,{method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
          
          })
         
        
    const data=await  response.json();
    if(response.ok)
    {
      alert("Login Successs Fully")
      localStorage.setItem('loginToken',data.token)
      showWelcomeHandler();
    }
    const vendorId=data.vendorId
    const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
    const vendorData=await vendorResponse.json();
    if(vendorResponse.ok)
    {
      const vendorFirmId=vendorData.vendorFirmId;
      const vendorFirmName=vendorData.vendor.firm[0].firmName;
      console.log("my firm name is",vendorFirmName)
      console.log("vendor id",data.vendorId);
      console.log("checking for vendor firmid",vendorFirmId)
      localStorage.setItem('firmId',vendorFirmId);
      localStorage.setItem('firmName',vendorFirmName)
      window.location.reload();
    }
    else
    {
      console.log("error");
    }
  } catch (error) {
    console.error(error);

  }

}

  return (
    <div className='loginSection'>

        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your email'/><br/>
            <label>Password</label>
       
       
            <input type='password' onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder='enter your password'/><br/>
       
         <div className="btnSubmit" >
            <button type='submit'> Submit</button></div>
        </form>
    </div>
  )
}

export default LoginForm