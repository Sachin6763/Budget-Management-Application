import React from "react";
import "../Css/CartCartItem.css";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { ProductId, ProductName, Price, Quantity } = item;
  const totalPrice = Price * Quantity;

  return (
    <div className="cart-item">
      <h3>{ProductName}</h3>
      <p>Price: ${Price}</p>
      <div className="quantity-buttons">
        <button onClick={() => onDecrease(item)}>-</button>
        <span>{Quantity}</span>
        <button onClick={() => onIncrease(item, 1)}>+</button>
      </div>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <button className="remove-button" onClick={() => onRemove(item)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
