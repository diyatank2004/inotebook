import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Updated for React Router v6

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // useNavigate replaces useHistory in React Router v6

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Logged in Successfully","success");
        navigate("/"); // Navigate to home page
      } else {
        props.showAlert("Invalid credentials","danger");
      }
    } catch (error) {
      props.showAlert("An error occurred during login.","danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <h2 className="mt-3">Login to Continue to iNotebook</h2>
    <div className="login-container">
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={credentials.email}
        name="email"
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
        name="password"
        onChange={onChange}
        value={credentials.password}
        className="form-control"
        id="password"
        required
      />
    </div>
    <button type="submit" className="btn btn-success">Login</button>
  </form>
</div>
</>
  );
};

export default Login;
