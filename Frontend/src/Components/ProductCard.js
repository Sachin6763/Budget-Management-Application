import React, { useState, useEffect } from "react";
import "../Css/ProductCardProductList.css";
import "../Css/Toaster.css";

const ProductCard = ({
  product,
  onAddToCart,
  setMessage,
  setShowToast,
  showToast,
}) => {
  const {
    AverageRating,
    Brand,
    Description,
    ExpiryDate,
    ManufactureDate,
    NumRatings,
    Price,
    ProductID,
    ProductName,
    StockQuantity,
    Weight,
  } = product;

  useEffect(() => {
    let toastTimer;
    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
    return () => {
      clearTimeout(toastTimer);
    };
  }, [showToast]);

  const handleAddToCart = () => {
    let c = onAddToCart(product, 0);
    console.log(c);
    if (c !== 1) {
      setMessage("Product Successfully Added !");
    } else {
      setMessage("Product Already Added !");
    }
    setShowToast(true);
  };

  return (
    <div className="single-card">
      <div className="card-details">
        <h3>{ProductName}</h3>
        <p>
          <strong>Brand:</strong> {Brand}
        </p>
        <p>{Description}</p>
        <p>
          <strong>Price:</strong> ${Price}
        </p>
        <p>
          <strong>Stock:</strong> {StockQuantity}
        </p>
        <p>
          <strong>Weight:</strong> {Weight} kg
        </p>
        <p>
          <strong>Average Rating:</strong> {AverageRating} ({NumRatings}{" "}
          ratings)
        </p>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
