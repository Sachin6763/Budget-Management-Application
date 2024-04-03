import React, { useState, useEffect } from "react";

const SavingGoalProjections = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  return (
    <div className="savings-goal-projections-container">
      <h2>Savings Goal Projections</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.GoalID}>
            {goal.GoalName}: ${goal.TargetAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingGoalProjections;
