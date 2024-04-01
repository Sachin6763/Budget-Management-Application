import React, { useEffect, useState } from "react";
import Payment from "./Payment";
import Order from "./Order";
import "../Css/PaymentForm.css";

export default function PaymentForm({ user, cartItems, setcartItems }) {
  let [count, setCount] = useState(1);
  const increase = () => {
    setCount(count + 1);
  };

  const [address, setAddress] = useState({
    UserID: user,
    StreetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
  });

  useEffect(() => {
    fetch(`http://localhost:4000/api/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if data is not empty before setting the state
        if (data && Object.keys(data).length > 0) {
          setAddress(data);
        }
      })
      .catch((error) => console.error("Error fetching address: ", error));
  }, [user]);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: user,
    lastName: "",
    mobile: "",
  });

  return (
    <div className="payment-form-container">
      <div className="incontainer">
        <div className="left-part-payment">
          <Order
            address={address}
            setAddress={setAddress}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
          />
        </div>
        <div className="right-part-payment">
          <div className="cart-item-content">
            <table border="2px solid red">
              <thead>
                <tr>
                  <th>ProductId</th>
                  <th>ProductName</th>
                  <th>Price($)</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((ele, index) => {
                    const { ProductId, ProductName, Price, Quantity } = ele;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* {setCount(count)} */}
                        <td>{ProductName}</td>
                        <td>{Price}</td>
                        <td>{Quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="payment-container">
            <Payment
              user={user}
              address={address}
              setAddress={setAddress}
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
              cartItems={cartItems}
              setcartItems={setcartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
