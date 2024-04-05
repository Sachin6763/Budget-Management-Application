import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const ExpenseTrendAnalysis = ({ nextDayExpense, expense }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  const currentYear = currentDate.getFullYear();
  const filteredExpense = expense.filter((item) => {
    const expenseDate = new Date(item.ExpenseDate);
    return (
      expenseDate.getMonth() + 1 === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Extract x and y data from filteredIncome
  const xData = filteredExpense.map((item) =>
    new Date(item.ExpenseDate).getDate()
  ); // Day of the month
  const yData = filteredExpense.map((item) => parseFloat(item.Amount) / 100); // Amount

  console.log("fir" + xData, yData);
  // Set custom layout to restrict width
  const layout = {
    width: 600, // Set desired width
    title: "Expense Trend Analysis",
    xaxis: {
      title: "Day of the Month",
      range: [1, 31], // Set range to limit x-axis to 1-31 days
    },
    yaxis: {
      title: "Expense (100Rs)",
      range: [0, 100], // Set range to limit y-axis
    },
  };
  return (
    <div className="expense-trend-analysis-container">
      <h2>Expense Trend Analysis</h2>
      <div className="expense-amount">{nextDayExpense}</div>
      <Plot
        className="scatter-plot"
        data={[
          {
            x: xData,
            y: yData,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={layout}
      />
    </div>
  );
};

export default ExpenseTrendAnalysis;
