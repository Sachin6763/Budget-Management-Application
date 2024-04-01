import React from "react";
// import "../Css/OrderSummaryReviewForm.css";

const OrderSummary = ({ orderDetails }) => {
  console.log(orderDetails);
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      {/* {orderDetails.map((item) => (
        console.log(item) 
      )} */}
      {/* <div key={item.orderDetailID}>
          <h3>{item.productName}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.subtotal}</p>
        </div>
      ))}
      <p>
        Total Amount: $
        {orderDetails.reduce((acc, item) => acc + item.subtotal, 0)}
      </p> */}
      {/* Place order button */}
    </div>
  );
};

export default OrderSummary;
