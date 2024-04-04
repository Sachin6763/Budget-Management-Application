// App.js

import React, { useState, useEffect } from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";
import "../../styles/FinancialGoals.css";

const FinancialGoals = (Username) => {
  const [goals, setGoals] = useState([]);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);

  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

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

  const fetchGoals = async () => {
    console.log(Username.Username);
    try {
      const response = await fetch(
        `http://localhost:4000/api/getPreviousGoals/${Username.Username}`
      );
      const data = await response.json();
      // console.log("success in getting goals");
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const addGoal = async (newGoal) => {
    // console.log(newGoal);
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

  const handleCompleteGoal = async (goalID) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/completeGoal/${goalID}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        console.error("Failed to complete goal.");
      } else {
        fetchGoals();
      }
    } catch (error) {
      console.error("Error completing goal:", error);
    }
  };

  return (
    <div className="goal-container">
      <div className="goal-buttons-container">
        <button onClick={() => setShowAddGoalForm(true)}>Add New Goal</button>
        <button onClick={() => setShowAddGoalForm(false)}>
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
  );
};

export default FinancialGoals;
