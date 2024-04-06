import React, { useState } from "react";

const CategoryWiseExpenses = ({
  expenses,
  Username,
  removeExpense,
  handleToaster,
}) => {
  // const [loading, setLoading] = useState(false);

  const handleRemoveExpense = async (expenseCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/expenses/removeexpenseitem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expenseCategoryName, Username }),
        }
      );
      if (response.ok) {
        removeExpense();
        handleToaster(expenseCategoryName + " Category Removed Successfully");
      } else {
        throw new Error("Failed to remove expense");
      }
    } catch (error) {
      console.error("Error removing expense:", error);
    }
  };

  return (
    <div className="category-wise-expenses-container">
      <h3>Categorywise Expenses</h3>
      <ul>
        {expenses.map((category) => (
          <li key={category.CategoryName}>
            {category.CategoryName}: ${category.TotalExpense}
            <button
              onClick={() => handleRemoveExpense(category.CategoryName)}
              className="remove-button"
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryWiseExpenses;
