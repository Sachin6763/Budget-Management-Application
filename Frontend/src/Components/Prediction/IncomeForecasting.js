import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const IncomeTrendAnalysis = ({ income }) => {
  const [scale, setScale] = useState(100);
  const [nextDayIncome, setNextDayIncome] = useState("No Income This Month");
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [filteredIncome, setFilteredIncome] = useState([]);
  const [dayNum, setDayNum] = useState(31);
  const [select, setSelect] = useState(1);

  useEffect(() => {
    filteredIncomeData();
  }, [timePeriod]);

  useEffect(() => {
    setNextDayIncome(predictNextDayIncome(filteredIncome));
  }, [filteredIncome, select]);

  const filteredIncomeData = async () => {
    try {
      const today = new Date();
      let startDate;

      switch (timePeriod) {
        case "weekly":
          startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
          );
          setSelect(0);
          break;
        case "monthly":
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          setSelect(1);
          break;
        case "yearly":
          startDate = new Date(today.getFullYear(), 0, 1);
          setSelect(2);
          break;
        case "till now":
          startDate = new Date(2016, 0, 1);
          setSelect(3);
          break;
        default:
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          setSelect(4);
      }

      const dateCount = {};
      const filtered = income.filter((item) => {
        const incomeDateString = new Date(item.IncomeDate).toDateString();
        const incomeDate = new Date(item.IncomeDate);
        if (incomeDate >= startDate) {
          if (dateCount[incomeDateString]) {
            dateCount[incomeDateString]++;
          } else {
            dateCount[incomeDateString] = 1;
          }
        }
        return incomeDate >= startDate;
      });

      let dateCountLength = Object.keys(dateCount).length;
      if (dateCountLength === 0) {
        dateCountLength = 1;
      }

      setFilteredIncome(filtered);
      setDayNum(dateCountLength);
    } catch (error) {
      console.error("Error occurred while filtering incomes:", error);
    }
  };

  const predictNextDayIncome = (incomeData) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    let currentMonthIncome = 0;
    incomeData.forEach((income) => {
      currentMonthIncome += parseFloat(income.Amount);
    });

    const averageDailyIncome = currentMonthIncome / dayNum;

    const nextDay = today.getDate() + 1;
    const predictedIncome = averageDailyIncome.toFixed(2);
    return `${currentMonth}-${nextDay}-${currentYear}: $${predictedIncome}`;
  };

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
      title: `Income (${scale}Rs)`,
      range: [0, 100], // limit y-axis
    },
  };

  const Scales = [1, 10, 100, 1000, 10000, 100000, 1000000];
  const TimePeriods = ["weekly", "monthly", "yearly", "till now"];

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  const handleTimePeriodChange = (selectedPeriod) => {
    setTimePeriod(selectedPeriod);
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
      <div className="time-period-select">
        {TimePeriods.map((period) => (
          <button
            key={period}
            onClick={() => handleTimePeriodChange(period)}
            className={timePeriod === period ? "selected" : ""}
          >
            {period}
          </button>
        ))}
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
