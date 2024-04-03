import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
    setUser(null);
    setIsDropdownOpen(false); // Close the dropdown menu when the user logs out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/home" className="brand-link">
          Budget Management
        </Link>
      </div>
      <div className="links">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/expense_tracking">Expense</Link>
            <Link to="/income_tracking">Income</Link>
            <Link to="/summary">Summary</Link>
            <Link to="/financial_goals">Goals</Link>
            <Link to="/prediction">Prediction</Link>
            {/* <Link to="/order">Order</Link> */}
            <div className="user-icon" onClick={toggleDropdown}>
              <FaUser />
              {isDropdownOpen && (
                <div className="dropdown">
                  {/* You can add more options here */}
                  <span>{user}</span>
                  <span onClick={handleLogout}>Logout</span>
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
