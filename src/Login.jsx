import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("mark123@gmail.com");
  const [password, setPassword] = useState("Mark@123");
  const handleLogin = async () => {
   try {
     const res = await axios.post("http://localhost:7777/login", {
       email,
       password,
     },{withCredentials:true});
    
   } catch (error) {
    console.error(error)
   }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="@ mail"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="password"
            />
          </fieldset>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
