import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../Styles/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/login");
    setUser(null);
    sessionStorage.removeItem("user"); // Remove user information from sessionStorage when the user logs out
    setIsDropdownOpen(false);
  };

  const getActiveLink = (pathname) => {
    switch (pathname) {
      case "/home":
        return "home";
      case "/expense_tracking":
        return "expense";
      case "/income_tracking":
        return "income";
      case "/summary":
        return "summary";
      case "/financial_goals":
        return "goals";
      case "/prediction":
        return "prediction";
      default:
        return "";
    }
  };

  // Determine the active link based on the current pathname
  const activeLink = getActiveLink(location.pathname);

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
            <Link
              to="/home"
              className={activeLink === "home" ? "nav-active" : ""}
            >
              Home
            </Link>
            <Link
              to="/expense_tracking"
              className={activeLink === "expense" ? "nav-active" : ""}
            >
              Expense
            </Link>
            <Link
              to="/income_tracking"
              className={activeLink === "income" ? "nav-active" : ""}
            >
              Income
            </Link>
            <Link
              to="/summary"
              className={activeLink === "summary" ? "nav-active" : ""}
            >
              Summary
            </Link>
            <Link
              to="/financial_goals"
              className={activeLink === "goals" ? "nav-active" : ""}
            >
              Goals
            </Link>
            <Link
              to="/prediction"
              className={activeLink === "prediction" ? "nav-active" : ""}
            >
              Prediction
            </Link>
            <div className="user-icon" onClick={toggleDropdown}>
              <FaUser />
              {isDropdownOpen && (
                <div className="dropdown">
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
