import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/login");
    setUser(null);
    sessionStorage.removeItem("user"); // Remove user information from sessionStorage when the user logs out
    setIsDropdownOpen(false); // Close the dropdown menu when the user logs out
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link
          to="/home"
          className="brand-link"
          onClick={() => {
            setActive("home");
          }}
        >
          Budget Management
        </Link>
      </div>
      <div className="links">
        {user ? (
          <>
            <Link
              to="/home"
              onClick={() => {
                setActive("home");
              }}
              className={active == "home" ? "nav-active" : ""}
            >
              Home
            </Link>
            <Link
              to="/expense_tracking"
              onClick={() => setActive("expense")}
              className={active == "expense" ? "nav-active" : ""}
            >
              Expense
            </Link>
            <Link
              to="/income_tracking"
              onClick={() => setActive("income")}
              className={active == "income" ? "nav-active" : ""}
            >
              Income
            </Link>
            <Link
              to="/summary"
              onClick={() => setActive("summary")}
              className={active == "summary" ? "nav-active" : ""}
            >
              Summary
            </Link>
            <Link
              to="/financial_goals"
              onClick={() => setActive("goals")}
              className={active == "goals" ? "nav-active" : ""}
            >
              Goals
            </Link>
            <Link
              to="/prediction"
              onClick={() => setActive("prediction")}
              className={active == "prediction" ? "nav-active" : ""}
            >
              Prediction
            </Link>
            {/* <Link to="/order">Order</Link> */}
            <div className="user-icon" onClick={toggleDropdown}>
              <FaUser />
              {isDropdownOpen && (
                <div className="dropdown">
                  {/* You can add more options here */}
                  <span onClick={handleLogout}>Logout</span>
                  <span>{user}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
