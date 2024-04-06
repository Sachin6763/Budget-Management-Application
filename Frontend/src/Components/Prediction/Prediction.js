import React, { useState, useEffect } from "react";
import "../../Styles/Prediction.css";
import ExpenseTrendAnalysis from "./ExpenseTrendAnalysis";
import IncomeForecasting from "./IncomeForecasting";
import AnomalyDetection from "./AnamolyDetection";

function Prediction({ Username }) {
  const [activeComponent, setActiveComponent] = useState("");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  const [expenses, setExpenses] = useState([]);
  const [nextDayExpense, setNextDayExpense] = useState("No Expense This Month");

  useEffect(() => {
    fetch("http://localhost:4000/api/prediction_expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  useEffect(() => {
    setNextDayExpense(predictNextDayExpense(expenses));
  }, [expenses]);

  function predictNextDayExpense(expenseData) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = today.getFullYear();
    // console.log(currentMonth, currentYear, expenses);

    // Filter expenses for the current month
    let currentMonthExpenses = 0;
    expenseData.forEach((expense) => {
      const expenseDate = new Date(expense.ExpenseDate);
      if (
        expenseDate.getMonth() + 1 === currentMonth &&
        expenseDate.getFullYear() === currentYear
      ) {
        currentMonthExpenses += parseFloat(expense.Amount);
      }
    });

    const averageDailyExpense = currentMonthExpenses / currentMonth;

    // Predict the next day's expense (assuming equal distribution of expenses)
    const nextDay = today.getDate() + 1;
    const predictedExpense = averageDailyExpense.toFixed(2); // Round to 2 decimal places

    return ` ${currentMonth}-${nextDay}-${currentYear}: $${predictedExpense}`;
  }

  // income prediction
  const [incomes, setIncomes] = useState([]);
  const [nextDayIncome, setNextDayIncome] = useState("No Income This Month");

  useEffect(() => {
    fetch("http://localhost:4000/api/prediction_income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Username }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIncomes(data);
      })
      .catch((error) => console.error("Error fetching incomes:", error));
  }, []);

  useEffect(() => {
    setNextDayIncome(predictNextDayIncome(incomes));
  }, [incomes]);

  function predictNextDayIncome(incomeData) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
    const currentYear = today.getFullYear();
    // console.log(currentMonth, currentYear, incomes);

    // Filter incomes for the current month
    let currentMonthIncomes = 0;
    incomeData.forEach((income) => {
      const incomeDate = new Date(income.IncomeDate);

      if (
        incomeDate.getMonth() + 1 === currentMonth &&
        incomeDate.getFullYear() === currentYear
      ) {
        currentMonthIncomes += parseFloat(income.Amount);
      }
    });

    // console.log(currentMonthIncomes);

    const averageDailyIncome = currentMonthIncomes / currentMonth;

    // Predict the next day's income (assuming equal distribution of incomes)
    const nextDay = today.getDate() + 1;
    const predictedIncome = averageDailyIncome.toFixed(2);

    return `${currentMonth}-${nextDay}-${currentYear}: $${predictedIncome}`;
  }

  return (
    <div className="prediction">
      <div className="prediction-sidebar">
        <button
          onClick={() => handleClick("prediction-expense")}
          className={`prediction-button ${
            activeComponent === "prediction-expense" ? "active" : ""
          }`}
        >
          Expense Trend Analysis
        </button>
        <button
          onClick={() => handleClick("prediction-income")}
          className={`prediction-button ${
            activeComponent === "prediction-income" ? "active" : ""
          }`}
        >
          Income Forecasting
        </button>
        <button
          onClick={() => handleClick("prediction-anomaly")}
          className={`prediction-button ${
            activeComponent === "prediction-anomaly" ? "active" : ""
          }`}
        >
          Anomaly Detection
        </button>
      </div>
      <div className="content">
        {activeComponent === "prediction-expense" && (
          <ExpenseTrendAnalysis
            nextDayExpense={nextDayExpense}
            expense={expenses}
          />
        )}
        {activeComponent === "prediction-income" && (
          <IncomeForecasting nextDayIncome={nextDayIncome} income={incomes} />
        )}

        {activeComponent === "prediction-anomaly" && (
          <AnomalyDetection Username={Username} />
        )}
      </div>
    </div>
  );
}

export default Prediction;
