import React from "react";

const TotalSavings = ({ totalSavings }) => {
  return (
    <div className="total-savings-container">
      <h3>Total Savings</h3>
      <p>${totalSavings}</p>
    </div>
  );
};

export default TotalSavings;
