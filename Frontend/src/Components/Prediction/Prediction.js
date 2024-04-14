import React, { useState, useEffect } from "react";
import "../../Styles/Prediction.css";
import ExpenseTrendAnalysis from "./ExpenseTrendAnalysis";
import IncomeForecasting from "./IncomeForecasting";
import AnomalyDetection from "./AnamolyDetection";

function Prediction({ Username }) {
  const [activeComponent, setActiveComponent] = useState("");

  // 0   -->  weekly
  // 1   --> monthly
  // 2   --> yearly

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/prediction_expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  // income prediction
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/prediction_income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIncomes(data);
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  }, []);

  return (
    <div className="prediction">
      <div className="prediction-sidebar">
        <button
          onClick={() => handleClick("prediction-expense")}
          className={`prediction-button ${
            activeComponent === "prediction-expense" ? "active" : ""
          }`}
        >
          Expense Trend Analysis
        </button>
        <button
          onClick={() => handleClick("prediction-income")}
          className={`prediction-button ${
            activeComponent === "prediction-income" ? "active" : ""
          }`}
        >
          Income Forecasting
        </button>
        <button
          onClick={() => handleClick("prediction-anomaly")}
          className={`prediction-button ${
            activeComponent === "prediction-anomaly" ? "active" : ""
          }`}
        >
          Anomaly Detection
        </button>
      </div>
      <div className="content">
        {activeComponent === "prediction-expense" && (
          <ExpenseTrendAnalysis expense={expenses} />
        )}
        {activeComponent === "prediction-income" && (
          <IncomeForecasting income={incomes} />
        )}

        {activeComponent === "prediction-anomaly" && (
          <AnomalyDetection Username={Username} />
        )}
      </div>
    </div>
  );
}

export default Prediction;
