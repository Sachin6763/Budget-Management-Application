import React from "react";
import Plot from "react-plotly.js";

const IncomeTrendAnalysis = ({ nextDayIncome, income }) => {
  // Filter data for the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  const currentYear = currentDate.getFullYear();
  const filteredIncome = income.filter((item) => {
    const incomeDate = new Date(item.IncomeDate);
    return (
      incomeDate.getMonth() + 1 === currentMonth &&
      incomeDate.getFullYear() === currentYear
    );
  });

  // Extract x and y data from filteredIncome
  const xData = filteredIncome.map((item) =>
    new Date(item.IncomeDate).getDate()
  ); // Day of the month
  const yData = filteredIncome.map((item) => parseFloat(item.Amount) / 10); // Amount

  // Set custom layout to restrict width
  const layout = {
    width: 600, // Set desired width
    title: "Income Trend Analysis",
    xaxis: {
      title: "Day of the Month",
      range: [1, 31], // Set range to limit x-axis to 1-31 days
    },
    yaxis: {
      title: "Income (10Rs)",
      range: [0, 100], // Set range to limit y-axis
    },
  };

  return (
    <div className="expense-trend-analysis-container">
      <h2>Income Trend Analysis</h2>
      <div className="expense-amount">{nextDayIncome}</div>
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

export default IncomeTrendAnalysis;
