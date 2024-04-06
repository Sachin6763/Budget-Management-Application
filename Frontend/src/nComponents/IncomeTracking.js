import React, { useState, useEffect } from "react";
import "../styles/IncomeTracking.css";
import AddCategoryForm from "./AddCategoryForm";
import "../Css/Toaster.css";

const AddIncomeForm = ({ Username }) => {
  const [formData, setFormData] = useState({
    UserID: Username,
    Name: "",
    Amount: "",
    Date: new Date().toISOString().slice(0, 10),
    CategoryID: -1, // To store the selected category ID
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchIncomeCategories();
  }, []);

  const fetchIncomeCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/incomecategories"
      );
      const data = await response.json();
      setIncomeCategories(data);
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

  const emptyForm = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && key !== "UserID" && key != "Date") {
        formData[key] = "";
      }
    }
    setSelectedCategory("");
  };

  const selectedIncomeCategory = async (categoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/incomecategoryid",
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
    if (name === "Date") {
      setFormData({ ...formData, Date: new Date().toISOString().slice(0, 10) });
    } else if (name === "CategoryID") {
      setSelectedCategory(value);
      const categoryId = await selectedIncomeCategory(value);
      // console.log(categoryId);
      setFormData({ ...formData, CategoryID: categoryId });
    } else if (name !== "UserID") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddIncome = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/addIncome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: Username,
          name: formData.Name,
          amount: formData.Amount,
          date: new Date().toISOString().slice(0, 10),
          category: formData.CategoryID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToasterMessage("Income Added Successfully !");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
          emptyForm();
        }, 2000);
      } else {
        setToasterMessage(`Error: ${data.error}`);
        setShowToaster(true);
      }
    } catch (error) {
      console.error("Error adding income:", error);
      setMessage("Error adding income. Please try again.");
    }
  };

  const handleAddNewCategory = async (categoryName) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/addIncomeCategory",
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

      if (response.ok) {
        // Category added successfully
        console.log("New category added successfully");
        // You may want to fetch the updated category list here
      } else {
        const data = await response.json();
        console.error("Error adding new category:", data.error);
        // Handle error
      }
    } catch (error) {
      console.error("Error adding new category:", error);
      // Handle error
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddCategory = async (categoryName) => {
    console.log("here");
    try {
      const response = await fetch(
        "http://localhost:4000/api/addIncomeCategory",
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
        setToasterMessage("Category Added Successfully!");
        setShowToaster(true);
        setTimeout(() => {
          setShowToaster(false);
          fetchIncomeCategories(); // Refresh the category list after adding a new category
        }, 2000);
      } else {
        setToasterMessage(`Error: ${data.error}`);
        setShowToaster(true);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage("Error adding category. Please try again.");
    }
  };

  return (
    <div id="income-form-container">
      {showForm && <AddCategoryForm onAddCategory={handleAddCategory} />}
      <h2 className="income-header">Add Income</h2>
      <label>Name:</label>
      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        className="income-input-field"
      />
      <label>Amount:</label>
      <input
        type="number"
        name="Amount"
        value={formData.Amount}
        onChange={handleChange}
        className="income-input-field"
      />
      <label>Category:</label>
      <div className="category-select-container">
        <select
          name="CategoryID"
          value={selectedCategory}
          onChange={handleChange}
          className="income-input-field category-select"
        >
          <option value="">Select Category</option>
          {incomeCategories.map((category) => (
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
        onClick={handleAddIncome}
        disabled={!isFormDataFilled()}
        className="income-submit-button"
        style={{ cursor: !isFormDataFilled() ? "not-allowed" : "pointer" }}
      >
        Add Income
      </button>
      {showToaster && <div className="toaster">{toasterMessage}</div>}
    </div>
  );
};

export default AddIncomeForm;
