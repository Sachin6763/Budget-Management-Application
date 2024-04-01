import React from "react";

const CategoryWiseExpenses = ({ expenses }) => {
  return (
    <div className="category-wise-expenses-container">
      <h3>Categorywise Expenses</h3>
      <ul>
        {expenses.map((category) => (
          <li key={category.CategoryID}>
            {category.CategoryName}: ${category.TotalExpense}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryWiseExpenses;
