import React, { useState } from "react";
import ExpenseAnomalyDetection from "./ExpenseAnomalyDetection";
import IncomeAnomalyDetection from "./IncomeAnamalyDetection";

const AnomalyDetection = ({ Username }) => {
  const [activeComponent, setActiveComponent] = useState("expense");

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="anomaly-detection-container">
      <h2>Anomaly Detection</h2>
      <div className="anomaly-buttons">
        <button
          className={activeComponent === "expense" ? "active" : ""}
          onClick={() => handleButtonClick("expense")}
        >
          Expense Anomaly
        </button>
        <button
          className={activeComponent === "income" ? "active" : ""}
          onClick={() => handleButtonClick("income")}
        >
          Income Anomaly
        </button>
      </div>
      <div className="anomaly-component">
        {activeComponent === "expense" ? (
          <ExpenseAnomalyDetection Username={Username} />
        ) : (
          <IncomeAnomalyDetection Username={Username} />
        )}
      </div>
    </div>
  );
};

export default AnomalyDetection;
