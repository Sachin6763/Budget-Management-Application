import React, { useState, useEffect } from "react";
import "../../Styles/ExpenseTracking.css";
import AddCategoryForm from "./AddCategoryForm";

const AddExpenseForm = ({ Username }) => {
  const [selectedExpCategory, setSelectedExpCategory] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    UserID: Username,
    Name: "",
    Amount: "",
    Date: new Date().toISOString().slice(0, 10),
    CategoryID: "",
  });
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    fetExpenseCategories();
  }, []);

  const fetExpenseCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/expensecategories"
      );
      const data = await response.json();
      setExpenseCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const isFormDataFilled = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (!formData[key]) {
          return false;
        }
      }
    }
    return true;
  };

  const selectedExpenseCategory = async (categoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/expensecategoryid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName: categoryName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch category ID");
      }
      const data = await response.json();
      return data.categoryId;
    } catch (error) {
      console.error("Error fetching category ID:", error);
      return null;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "CategoryID") {
      setSelectedExpCategory(value);
      const categoryId = await selectedExpenseCategory(value);
      setFormData({ ...formData, CategoryID: categoryId });
    } else if (name === "Date") {
      setFormData({ ...formData, Date: value });
    } else if (name !== "UserID") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const emptyForm = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && key !== "UserID" && key != "Date") {
        // console.log(key);
        formData[key] = "";
      }
    }
    setSelectedExpCategory("");
  };

  const handleAddExpense = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Username,
          expensename: formData.Name,
          amount: formData.Amount,
          date: formData.Date,
          category: formData.CategoryID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToasterMessage("Expense Added Successfully !");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
          emptyForm();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddCategory = async (categoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/addExpenseCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName: categoryName,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setToasterMessage("Expense Category Added Successfully!");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
          fetExpenseCategories();
        }, 2000);
      } else {
        setToasterMessage("Expense Category is already present");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div id="income-form-container">
      {showForm && <AddCategoryForm onAddCategory={handleAddCategory} />}
      <h2 className="income-header">Add Expense</h2>
      <label className="income-label">Name:</label>
      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        className="income-input-field"
      />
      <label className="income-label">Amount:</label>
      <input
        type="number"
        name="Amount"
        value={formData.Amount}
        onChange={handleChange}
        className="income-input-field"
      />
      <label className="income-label">Category:</label>
      <div className="category-select-container">
        <select
          name="CategoryID"
          value={selectedExpCategory}
          onChange={handleChange}
          className="income-input-field"
        >
          <option value="">Select Category</option>
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="add-category-inside-button" onClick={toggleForm}>
          <div className="add-category-icon">
            <span>+</span>
          </div>
        </button>
      </div>
      <button
        onClick={handleAddExpense}
        disabled={!isFormDataFilled()}
        className="income-submit-button"
        style={{ cursor: !isFormDataFilled() ? "not-allowed" : "pointer" }}
      >
        Add Expense
      </button>

      {showToaster && <div className="toaster">{toasterMessage}</div>}
    </div>
  );
};

export default AddExpenseForm;
