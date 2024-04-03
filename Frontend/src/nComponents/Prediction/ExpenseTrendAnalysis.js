import React, { useState, useEffect } from "react";

const ExpenseTrendAnalysis = ({ nextDayExpense }) => {
  return (
    <div className="expense-trend-analysis-container">
      <h2>Expense Trend Analysis</h2>
      <div className="expense-amount">{nextDayExpense}</div>
    </div>
  );
};

export default ExpenseTrendAnalysis;
