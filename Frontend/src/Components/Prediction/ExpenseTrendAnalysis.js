import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const ExpenseTrendAnalysis = ({ expense }) => {
  const [scale, setScale] = useState(100);
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [filteredExpense, setFilteredExpense] = useState([]);
  const [dayNum, setDayNum] = useState(31);
  const [nextDayExpense, setNextDayExpense] = useState("No Expense This Month");
  const [select, setSelect] = useState(1);

  useEffect(() => {
    filterExpenseData();
  }, [timePeriod]);

  useEffect(() => {
    setNextDayExpense(predictNextDayExpense(filteredExpense));
  }, [filteredExpense, select]);

  const filterExpenseData = async () => {
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
      const filtered = await expense.filter((item) => {
        const expenseDateString = new Date(item.ExpenseDate).toDateString();
        const expenseDate = new Date(item.ExpenseDate);
        if (expenseDate >= startDate) {
          if (dateCount[expenseDateString]) {
            dateCount[expenseDateString]++;
          } else {
            dateCount[expenseDateString] = 1;
          }
        }
        return expenseDate >= startDate;
      });

      let dateCountLength = Object.keys(dateCount).length;
      if (dateCountLength === 0) {
        dateCountLength = 1;
      }

      setFilteredExpense(filtered);
      setDayNum(dateCountLength);
      // console.log(filteredExpense);
      // console.log(dayNum);
    } catch (error) {
      console.error("Error occurred while filtering expenses:", error);
    }
  };

  function predictNextDayExpense(expenseData) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = today.getFullYear();

    // Filter expenses for the current month
    let currentMonthExpenses = 0;
    expenseData.forEach((expense) => {
      currentMonthExpenses += parseFloat(expense.Amount);
    });

    const averageDailyExpense = currentMonthExpenses / dayNum;

    // Predict the next day's expense (assuming equal distribution of expenses)
    const nextDay = today.getDate() + 1;
    const predictedExpense = averageDailyExpense.toFixed(2); // Round to 2 decimal places

    return `${currentMonth}-${nextDay}-${currentYear}: $${predictedExpense}`;
  }
  // Extract x and y data from filteredIncome --> Day of the Month
  const xData = filteredExpense.map((item) =>
    new Date(item.ExpenseDate).getDate()
  );
  const yData = filteredExpense.map((item) => parseFloat(item.Amount) / scale);

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
  const TimePeriods = ["weekly", "monthly", "yearly", "till now"];

  const handleScaleChange = (event) => {
    setScale(event.target.value);
  };

  const handleTimePeriodChange = (selectedPeriod) => {
    setTimePeriod(selectedPeriod);
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

export default ExpenseTrendAnalysis;
