import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css";
import "../Css/Toaster.css";

const Login = ({ loggedIn }) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (!userID || !password) {
      setToasterMessage("Fill all the input fields");
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 5000);
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, password }), // Use 'username' instead of 'userID'
      });

      const data = await response.json();

      if (response.status === 200) {
        // Check response status
        // Login successful
        loggedIn(userID); // Make sure 'loggedIn' function is defined
        setToasterMessage("Login Successful");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false); // Hide toaster after 5 seconds
          navigate("/home");
        }, 2000);
      } else {
        // Login failed
        setToasterMessage("Invalid Username or Password");
        setShowToaster(true);
        console.error("Login failed: " + data.error);
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  useEffect(() => {
    let timer;
    if (showToaster) {
      timer = setTimeout(() => {
        setShowToaster(false);
      }, 5000); // Hide toaster after 5 seconds
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToaster]);

  return (
    <div className="form-container" id="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="submit-button">
        Login
      </button>
      {showToaster && <div className="toaster">{toasterMessage}</div>}
    </div>
  );
};

export default Login;
