import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css";
import "../Css/Toaster.css";

const Register = () => {
  const [UserID, setUserID] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!UserID || !Password || !Email) {
      setToasterMessage("Fill all the input fields");
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false); // Hide toaster after 5 seconds
      }, 2000);
      console.error("All fields are required");
      return;
    }

    fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: UserID,
        Password: Password,
        Email: Email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //setToasterMessage(data.message); // Set toaster message based on API response
        setShowToaster(true); // Show toaster
        setToasterMessage("Register Successfully");
        setTimeout(() => {
          setShowToaster(false); // Hide toaster after 5 seconds
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="form-container" id="register-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={UserID}
        onChange={(e) => setUserID(e.target.value)}
        className="login-input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input-field"
      />
      <button onClick={handleRegister} className="submit-button">
        Register
      </button>
      {showToaster && <div className="toaster">{toasterMessage}</div>}
    </div>
  );
};

export default Register;
