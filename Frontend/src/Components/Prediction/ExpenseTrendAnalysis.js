import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const ExpenseTrendAnalysis = ({ nextDayExpense, expense }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [scale, setScale] = useState(100);
  const currentYear = currentDate.getFullYear();
  const filteredExpense = expense.filter((item) => {
    const expenseDate = new Date(item.ExpenseDate);
    return (
      expenseDate.getMonth() + 1 === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  // Extract x and y data from filteredIncome --> Day of the Month
  const xData = filteredExpense.map((item) =>
    new Date(item.ExpenseDate).getDate()
  );
  const yData = filteredExpense.map((item) => parseFloat(item.Amount) / scale); // Amount

  const layout = {
    width: 600,
    title: "Expense Trend Analysis",
    xaxis: {
      title: "Day of the Month",
      range: [1, 31], // limit x-axis to 1-31 days
    },
    yaxis: {
      title: `Expense (${scale}Rs)`,
      range: [0, 100], // limit y-axis
    },
  };

  const Scales = [1, 10, 100, 1000, 10000, 100000, 1000000];

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };
  return (
    <div className="expense-trend-analysis-container">
      <h2>Expense Trend Analysis</h2>
      <div className="expense-amount">{nextDayExpense}</div>
      <div className="scale-select">
        <span>Select Scale : </span>
        <select value={scale} onChange={handleScaleChange}>
          {Scales.map((scale) => (
            <option key={scale} value={scale}>
              {scale}
            </option>
          ))}
        </select>
      </div>
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
