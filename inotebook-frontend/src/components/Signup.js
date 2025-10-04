import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure passwords match before sending to the backend
    if (credentials.password !== credentials.confirm_password) {
      props.showAlert("Passwords do not match","danger");
      return;
    }
    
    console.log("The backend URL is:", process.env.REACT_APP_BACKEND_URL);
    try {
      const response = await fetch("${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          confirm_password: credentials.confirm_password, // send both passwords
        }),
      });
  
      const json = await response.json();
  
      if (json.authtoken) {
        // Sign up was successful
        localStorage.setItem("token", json.authtoken); // Store the token if necessary
        navigate("/login"); // Redirect to home page
        props.showAlert("Account created Successfully","success");
      } else {
        // Sign up failed, show an error
        props.showAlert("Sign up failed: " + (json.errors ? json.errors[0].msg : "Unknown error"),"danger");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      props.showAlert("An error occurred during sign up.","danger");
    }
  };  
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <h2>Create an Account on iNotebook</h2>
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={8}
            required
          />
        </div>

        <div className="mb-3">
        <label htmlFor="confirm_password" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirm_password"
          name="confirm_password"
          onChange={onChange}
          value={credentials.confirm_password}
          required
        />
      </div>

        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;  