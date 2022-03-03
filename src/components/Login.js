import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [credentials,setCredentials]=useState({email:"",password:""})
let history=useHistory();
  const  handleSubmit=async(e)=>{
e.preventDefault();
const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email:credentials.email,password:credentials.password}),

  });
  const json =await response.json();
  console.log(json)
  if(json.success){
      // save the auth token and redirect
localStorage.setItem('token',json.authtoken)
history.push("/");
  }
  else{
      alert("invalid credentials")
  }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email"  value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="email" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" value={credentials.password} name="password"  onChange={onChange} id="password"/>
  </div>
 
  <button  type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
