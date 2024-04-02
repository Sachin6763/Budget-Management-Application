// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Import CSS file for styling
import expenseTrackingImage from "../images/expense_tracking.png";
import financialGoalsImage from "../images/financial_goals.png";
import predictiveAnalyticsImage from "../images/predictive_analysis.png";
import reportImage from "../images/report.png";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Budget Management App</h1>
        <p>
          Take control of your finances with our intuitive budget management
          application.
        </p>
        <div className="image-grid">
          <div className="image-box">
            <img src={expenseTrackingImage} alt="Expense Tracking" />
            <div className="image-overlay">
              <p>Expense Tracking</p>
            </div>
          </div>
          <div className="image-box">
            <img src={financialGoalsImage} alt="Financial Goals" />
            <div className="image-overlay">
              <p>Financial Goals</p>
            </div>
          </div>
          <div className="image-box">
            <img src={predictiveAnalyticsImage} alt="Predictive Analytics" />
            <div className="image-overlay">
              <p>Predictive Analytics</p>
            </div>
          </div>
          <div className="image-box">
            <img src={reportImage} alt="Report" />
            <div className="image-overlay">
              <p>Report</p>
            </div>
          </div>
        </div>
        <div className="cta-buttons">
          <Link to="/login" className="auth-button">
            Get Started
          </Link>
          <Link to="/expense_tracking" className="finance-button">
            Explore Features
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
