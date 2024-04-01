import React from "react";

const CategoryWiseIncomes = ({ incomes }) => {
  return (
    <div className="category-wise-incomes-container">
      <h3>Categorywise Incomes</h3>
      <ul>
        {incomes.map((category) => (
          <li key={category.CategoryID}>
            {category.CategoryName}: ${category.TotalIncome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryWiseIncomes;
