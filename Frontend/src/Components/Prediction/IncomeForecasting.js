import { useState, React } from "react";
import Plot from "react-plotly.js";

const IncomeTrendAnalysis = ({ nextDayIncome, income }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const [scale, setScale] = useState(100);
  const currentYear = currentDate.getFullYear();
  const filteredIncome = income.filter((item) => {
    const incomeDate = new Date(item.IncomeDate);
    return (
      incomeDate.getMonth() + 1 === currentMonth &&
      incomeDate.getFullYear() === currentYear
    );
  });

  // Extract x and y data from filteredIncome --> Day of the Month
  const xData = filteredIncome.map((item) =>
    new Date(item.IncomeDate).getDate()
  );
  const yData = filteredIncome.map((item) => parseFloat(item.Amount) / scale);

  const layout = {
    width: 600,
    title: "Income Trend Analysis",
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
      <h2>Income Trend Analysis</h2>
      <div className="expense-amount">{nextDayIncome}</div>
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

export default IncomeTrendAnalysis;
