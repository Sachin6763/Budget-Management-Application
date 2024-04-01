import React from "react";
import CartItem from "./CartItem";
import "../Css/CartCartItem.css";
import Payment from "./Payment.js";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, onIncrease, onDecrease, onRemove, user }) => {
  const navigate = useNavigate();
  let flag = true;
  // console.log(user);
  const handleOrder = () => {
    let flag = true;

    fetch(`http://localhost:4000/api/checkAddress/${user}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response JSON
        } else {
          throw new Error("Failed to checkAddress.");
        }
      })
      .then((addressCount) => {
        console.log("Address Count:", addressCount);
        if (addressCount === 1) {
          flag = false;
        }
        console.log(flag);
        flag = true;
        // if (flag === true) {
        //   navigate("/order");
        // } else {
        navigate("/payment");
        // }
      })
      .catch((error) => {
        // Handle network errors or other issues
        console.error("Error in removing the item from cart: ", error);
      });
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.Price * item.Quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems &&
        cartItems.map((item) => (
          <CartItem
            key={item.productID}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>
      {cartItems.length !== 0 && (
        <button
          onClick={() => {
            navigate("/order");
          }}
          className="order-button"
        >
          Order Now
        </button>
      )}
    </div>
  );
};

export default Cart;
