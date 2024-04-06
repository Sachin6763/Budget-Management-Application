// import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Login from "./Components/Authentication/Login";
import Home from "./Components/Home";
import Register from "./Components/Authentication/Register";
import AddTransactionForm from "./Components/ExpenseAndIncomeTracking/ExpenseTracking";
import AddIncomeForm from "./Components/ExpenseAndIncomeTracking/IncomeTracking";
import Summary from "./Components/Summary/Summary";
import FinancialGoals from "./Components/FinancialGoal/FinancialGoals";
import Prediction from "./Components/Prediction/Prediction";

export default function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user information from sessionStorage during initial state setup
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loggedIn = (userId) => {
    setUser(userId);
    // console.log("user " + userId);
    // Store user information in sessionStorage when user logs in
    sessionStorage.setItem("user", JSON.stringify(userId));
  };

  const months = [
    { value: "", label: "Select Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "", label: "Select Year" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register />} />
          {user && (
            <Route
              path="/expense_tracking"
              element={<AddTransactionForm Username={user} />}
            />
          )}
          {user && (
            <Route
              path="/income_tracking"
              element={<AddIncomeForm Username={user} />}
            />
          )}
          {user && (
            <Route
              path="/summary"
              element={
                <Summary Username={user} months={months} years={years} />
              }
            />
          )}
          {user && (
            <Route
              path="/financial_goals"
              element={
                <FinancialGoals Username={user} months={months} years={years} />
              }
            />
          )}
          {user && (
            <Route
              path="/prediction"
              element={<Prediction Username={user} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}
