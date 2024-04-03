import React, { useState, useEffect } from "react";

const IncomeTrendAnalysis = ({ nextDayIncome }) => {
  return (
    <div className="expense-trend-analysis-container">
      <h2>Income Trend Analysis</h2>
      <div className="expense-amount">{nextDayIncome}</div>
    </div>
  );
};

export default IncomeTrendAnalysis;
