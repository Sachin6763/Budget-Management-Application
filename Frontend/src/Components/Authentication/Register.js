import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/LoginRegister.css";
import "../../Styles/Toaster.css";

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
        setShowToaster(false);
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
      .then((response) => {
        if (response.status === 500) {
          setToasterMessage("Error registering user. Please try again later.");
          setShowToaster(true);
          setTimeout(() => {
            setShowToaster(false);
          }, 2000);
        }
        if (response.status === 400) {
          setToasterMessage("Name or Email is already taken.");
          setShowToaster(true);
          setTimeout(() => {
            setShowToaster(false);
          }, 2000);
          return response.json();
        }
      })
      .then((data, status) => {
        if (status !== 500 && status != 400) {
          // Successful registration
          setToasterMessage("Register Successfully");
          setShowToaster(true);
          setTimeout(() => {
            setShowToaster(false);
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <div className="form-container" id="register-form">
      <h2>REGISTER</h2>
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
