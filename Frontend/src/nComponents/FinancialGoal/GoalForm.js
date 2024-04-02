// GoalForm.js

import React, { useState } from "react";

const GoalForm = ({ addGoal, Username }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    // console.log(Username.Username);
    e.preventDefault();
    addGoal({
      Username: Username,
      GoalName: goalName,
      TargetAmount: targetAmount,
      Deadline: deadline,
    }); // Assuming UserID is 1
    setGoalName("");
    setTargetAmount(0);
    setDeadline("");
  };

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Goal Name:
          <input
            type="text"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
        </label>
        <label>
          Target Amount:
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;
