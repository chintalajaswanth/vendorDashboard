import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../data/ApiPath';

const Register = ({showLoginHandler}) => {

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[error,setError]=useState("");
  const[loading,setLoading]=useState(true);

  const handleSubmit=async(e)=>{
   e.preventDefault();
   try {
    const response=await fetch(`${API_URL}/vendor/register`
      ,{method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      
      })
      const data=await response.json();

      if(response.ok)
      {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
         alert("vendor registered successfully")
         showLoginHandler();
      }
   } catch (error) {
 console.error("registration failed",error)
 alert("registration failed")

   }
  }


  return (
    <div className="registerSection">
         
        <form className='authForm'  onSubmit={handleSubmit}>
        <h3>Vendor Registration</h3>
            <label>Username</label>
            <input type="text" value={username} name="username" onChange={(e)=>setUsername(e.target.value)} placeholder='enter your name'/><br/>
            <label>Email</label><br/>
            <input type="text" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br/>
            <label>Password</label>
       
       
            <input type='password' value={password} name="password" onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br/>
       
         <div className="btnSubmit" >
            <button type='submit'>Submit</button></div>
        </form>
    </div>
  )
}

export default Register