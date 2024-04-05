// App.js

import React, { useState, useEffect } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import "../../styles/FinancialGoals.css";

const FinancialGoals = ({ Username, months, years }) => {
  const [goals, setGoals] = useState([]);
  const [goalCategoryID, setGoalCategoryID] = useState(19);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const handleMonthChange = (event) => {
    console.log(event.target.value);
    setSelectedMonth(event.target.value);
    // await fetchCategoryExpenses();
  };

  // Function to handle change in year select
  const handleYearChange = (event) => {
    console.log("year" + event.target.value);
    setSelectedYear(event.target.value);
    // await fetchCategoryExpenses();
  };
  const handleToaster = (message) => {
    setToasterMessage(message);
    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, 5000);
  };

  useEffect(() => {
    fetchGoals();
  }, []);
  useEffect(
    () => {
      fetchGoals();
    },
    [selectedMonth],
    [selectedYear]
  );

  const fetchGoals = async () => {
    console.log(Username.Username);
    try {
      const response = await fetch(
        `http://localhost:4000/api/getPreviousGoals/${Username}/${selectedMonth}/${selectedYear}`
      );
      const data = await response.json();
      // console.log("success in getting goals");
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const addGoal = async (newGoal) => {
    console.log(newGoal);
    try {
      await fetch("http://localhost:4000/api/addNewGoals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });
      fetchGoals();
      setShowAddGoalForm(false);
      handleToaster(newGoal.GoalName + " Goal Added Successfully");
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDiscardGoal = async (goalID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/discardGoal/${goalID}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        // Remove the discarded goal from the list
        const updatedGoals = goals.filter((goal) => goal.GoalID !== goalID);
        setGoals(updatedGoals);
      } else {
        console.error("Failed to discard goal.");
      }
    } catch (error) {
      console.error("Error discarding goal:", error);
    }
  };

  const handleAddExpense = async (ExpenseName, Amount, ExpenseDate) => {
    try {
      console.log(ExpenseName, Amount, ExpenseDate);
      const response = await fetch("http://localhost:4000/api/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Username,
          expensename: ExpenseName,
          amount: Amount,
          date: ExpenseDate,
          category: goalCategoryID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToasterMessage("Goal Added to Expense !");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleCompleteGoal = async (goal) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/completeGoal/${goal.GoalID}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        console.error("Failed to complete goal.");
      } else {
        await handleAddExpense(
          goal.GoalName,
          goal.TargetAmount,
          goal.Deadline.substring(0, 10)
        );
        await fetchGoals();
      }
    } catch (error) {
      console.error("Error completing goal:", error);
    }
  };

  return (
    <div>
      <div className="summary-header">
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
      <div className="goal-container">
        <div className="goal-buttons-container">
          <button
            onClick={() => setShowAddGoalForm(true)}
            className={
              showAddGoalForm == true ? "goal-active" : "goal-not-active"
            }
          >
            Add New Goal
          </button>
          <button
            onClick={() => setShowAddGoalForm(false)}
            className={
              showAddGoalForm === false ? "goal-active" : "goal-not-active"
            }
          >
            View Previous Goals
          </button>
        </div>
        {showAddGoalForm && <GoalForm addGoal={addGoal} Username={Username} />}
        {!showAddGoalForm && (
          <GoalList
            goals={goals}
            Username={Username}
            handleDiscardGoal={handleDiscardGoal}
            handleCompleteGoal={handleCompleteGoal}
          />
        )}
        {showToaster && <div className="toaster">{toasterMessage}</div>}
      </div>
    </div>
  );
};

export default FinancialGoals;
