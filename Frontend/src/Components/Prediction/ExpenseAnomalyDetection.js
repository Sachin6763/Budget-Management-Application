import React, { useState, useEffect } from "react";

const ExpenseAnomalyDetection = ({ Username }) => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/expense_anomalies?username=${Username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch anomalies");
        }
        return res.json();
      })
      .then((data) => {
        setAnomalies(data);
      })
      .catch((error) => {
        console.error("Error fetching anomalies:", error);
        setAnomalies([]);
      });
  }, [Username]);

  return (
    <div className="income-anomaly-detection-container">
      <div className="anomalies-list">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="anomaly-item">
            <p>
              <strong>Expense Name:</strong> {anomaly.ExpenseName}
            </p>
            <p>
              <strong>Expense Category:</strong> {anomaly.ExpenseCategory}
            </p>
            <p>
              <strong>Amount:</strong> {anomaly.Amount}
            </p>
            <p>
              <strong>Expense Date:</strong>{" "}
              {anomaly.ExpenseDate.substring(0, 10)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseAnomalyDetection;
