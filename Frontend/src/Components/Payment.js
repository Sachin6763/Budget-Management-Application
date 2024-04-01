import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Payment.css";
import Toaster from "./Toaster";

const UPIPaymentForm = ({
  user,
  address,
  setAddress,
  personalInfo,
  setPersonalInfo,
  cartItems,
  setcartItems,
}) => {
  const [upiId, setUpiId] = useState("");
  const [isValidUPI, setIsValidUPI] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setsuccess] = useState(false);

  // address={address}
  //           setAddress={setAddress}
  //           personalInfo={personalInfo}
  //           setpersonalInfo={setpersonalInfo}
  const handleUPIChange = (e) => {
    const upi = e.target.value;
    setUpiId(upi);

    // Regular expression to validate UPI ID
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
    setIsValidUPI(upiRegex.test(upi));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      isValidUPI +
        upiId +
        address.StreetAddress +
        address.City +
        address.State +
        address.Zipcode +
        address.Country +
        personalInfo.firstName +
        personalInfo.lastName +
        personalInfo.Mobile +
        cartItems
    );
    if (
      isValidUPI &&
      upiId
      // address.StreetAddress &&
      // address.City &&
      // address.State &&
      // // address.Zipcode &&
      // address.Country &&
      // personalInfo.firstName &&
      // personalInfo.lastName &&
      // // personalInfo.Mobile &&
      // cartItems
    ) {
      // Process payment with the valid UPI ID
      console.log("UPI ID is valid:", upiId);
      setsuccess(true);
      setMessage("Payment done successfully !");

      fetch("http://localhost:4000/api/storeAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address), // Send addressData instead of the entire 'address' object
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Handle the response as needed

          // Optionally, you can reset the address state after storing
          setAddress({
            UserID: user, // If you want to include UserID
            StreetAddress: "",
            City: "",
            State: "",
            ZipCode: "",
            Country: "",
          });
        })
        .catch((error) => console.error("Error storing address: ", error));

      // setAddress({
      //   // UserID: "",
      //   StreetAddress: "",
      //   City: "",
      //   State: "",
      //   ZipCode: "",
      //   Country: "",
      // });
      setPersonalInfo({
        firstName: "",
        lastName: "",
        mobile: "",
      });
      // try {
      //   fetch(`http://localhost:4000/api/submitPayment/${user}`).then(
      //     (response) => response.json()
      //   );
      // } catch (err) {
      //   console.log(err);
      // }

      fetch(`http://localhost:4000/api/submitPayment/${user}`)
        .then((responce) => {
          if (responce.ok) {
            console.log("Item  deleted from the  cart successfully.");
          } else {
            throw new Error("Failed to modify item to cart.");
          }
        })
        .catch((error) => {
          console.error("Error modifying item to cart: ", error);
        });

      setTimeout(() => {
        navigate("/product");
      }, 5000);
      setUpiId("");
      setcartItems([]);
      // Implement payment processing logic here
    } else {
      // Display error message for invalid UPI ID
      if (!isValidUPI) {
        setsuccess(true);
        setMessage("Enter valid UPIiD");
      } else {
        setsuccess(true);
        setMessage("Enter all the fields");
      }
    }
    setTimeout(() => setsuccess(false), 3000);
  };

  return (
    <div className="upi-payment-form">
      <h2>Enter UPI ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={handleUPIChange}
        />
        <button
          type="submit"
          disabled={
            !upiId ||
            !isValidUPI ||
            !address.StreetAddress ||
            !address.City ||
            !address.State ||
            // address.Zipcode &&
            !address.Country ||
            !personalInfo.firstName ||
            !personalInfo.lastName ||
            !personalInfo.mobile
          }
          // personalInfo.Mobile &&
          cartItems
        >
          Pay via UPI
        </button>
      </form>
      {!isValidUPI && (
        <div className="error-message">Invalid UPI ID. Please try again.</div>
      )}
      {isValidUPI && success && <Toaster message={message} flag={true} />}
    </div>
  );
};

export default UPIPaymentForm;
