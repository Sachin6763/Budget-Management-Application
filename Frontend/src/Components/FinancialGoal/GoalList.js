import React from "react";

const GoalList = ({
  goals,
  Username,
  handleDiscardGoal,
  handleCompleteGoal,
}) => {
  const formatDate = (dateString) => {
    return dateString.split("T")[0];
  };

  const calculateRemainingDays = (deadline) => {
    const today = new Date();
    const endDate = new Date(deadline);
    const differenceInTime = endDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div className="goal-list-container">
      <table>
        <thead>
          <tr>
            <th>Goal Name</th>
            <th>Target Amount</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Remaining Days</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal, index) => (
            <tr key={index} className={goal.Status.toLowerCase()}>
              <td>{goal.GoalName}</td>
              <td>${goal.TargetAmount}</td>
              <td>{formatDate(goal.Deadline)}</td>
              <td>{goal.Status}</td>
              <td>{calculateRemainingDays(goal.Deadline)}</td>
              <td>
                <button
                  className="goal-button-discard"
                  onClick={() => handleDiscardGoal(goal.GoalID)}
                >
                  Discard
                </button>
                {goal.Status !== "Completed" && (
                  <button
                    className="goal-button-complete"
                    onClick={() => handleCompleteGoal(goal)}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalList;
