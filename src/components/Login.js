import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {
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
props.showAlert("Logged in  successfully","success")
  }
  else{
      props.showAlert("Invalid credentials","danger")
  }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="my-3">
      <h2>Login to continue to inotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="my-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} name="password"  onChange={onChange} id="password"/>
  </div>
 
  <button  type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
