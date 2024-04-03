import React, { useState, useEffect } from "react";

const IncomeAnomalyDetection = ({ Username }) => {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:4000/api/income_anomalies?username=${Username}&type=income`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch income anomalies");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setAnomalies(data);
      })
      .catch((error) => {
        console.error("Error fetching income anomalies:", error);
        // Optionally, you can set a default value for anomalies here
        setAnomalies([]);
      });
  }, [Username]);

  return (
    <div className="income-anomaly-detection-container">
      {/* <h2>Income Anomaly Detection</h2> */}
      <div className="anomalies-list">
        {anomalies.map((anomaly, index) => (
          <div key={index} className="anomaly-item">
            <p>
              <strong>Income Name:</strong> {anomaly.Name}
            </p>
            <p>
              <strong>Income Category:</strong> {anomaly.Category}
            </p>
            <p>
              <strong>Amount:</strong> {anomaly.Amount}
            </p>
            <p>
              <strong>Income Date:</strong>{" "}
              {anomaly.Date ? anomaly.Date.substring(0, 10) : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeAnomalyDetection;
