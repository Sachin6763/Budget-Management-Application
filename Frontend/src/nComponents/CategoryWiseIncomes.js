import React from "react";

const CategoryWiseIncomes = ({
  incomes,
  Username,
  removeIncome,
  handleToaster,
}) => {
  const handleRemoveIncome = async (incomeCategoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/incomes/removeincomeitem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ incomeCategoryName, Username }),
        }
      );
      if (response.ok) {
        removeIncome();
        handleToaster(incomeCategoryName + " Category Removed Successfully");
      } else {
        throw new Error("Failed to remove expense");
      }
    } catch (error) {
      console.error("Error removing expense:", error);
    }
  };

  return (
    <div className="category-wise-incomes-container">
      <h3>Categorywise Incomes</h3>
      <ul>
        {incomes.map((category) => (
          <li key={category.CategoryName}>
            {category.CategoryName}: ${category.TotalIncome}
            <button
              onClick={() => handleRemoveIncome(category.CategoryName)}
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

export default CategoryWiseIncomes;
