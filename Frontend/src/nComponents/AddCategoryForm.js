import React, { useState } from "react";
import "../styles/AddCategoryForm.css";

const AddCategoryForm = ({ onAddCategory }) => {
  const [sshowForm, setSshowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      setCategoryName("");
    }
  };

  return (
    <div className="add-category-container">
      <button
        className="add-category-button"
        onClick={() => setSshowForm(true)}
      >
        Add New Category
      </button>
      {sshowForm && (
        <div className="add-category-form">
          <h4>Add New Category</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />
            <div className="button-container">
              <button type="button" onClick={() => setSshowForm(false)}>
                Cancel
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCategoryForm;
