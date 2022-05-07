import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Signup(props) {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
let history = useHistory();
  const  handleSubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password,}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password}),
    
      });
      const json =await response.json();
      console.log(json)
      if(json.success){
          // save the auth token and redirect
    localStorage.setItem('token',json.authtoken)
    history.push("/");
props.showAlert("Acoount created successfully","success")

      }
      else{
        props.showAlert("Invalid credentials","danger")

      }
        }
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
      <h2>Create an account to use inotebook</h2>
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp"onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={credentials.password} minLength={5}required name="password" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} minLength={5}required name="cpassword" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
