// GoalList.js

import React from "react";

const GoalList = ({ goals, Username }) => {
  return (
    <div className="goal-list-container">
      <h2>Previous Goals</h2>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            <strong>{goal.GoalName}</strong> - ${goal.TargetAmount} by{" "}
            {goal.Deadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
