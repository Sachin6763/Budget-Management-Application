import React, { useState } from "react";
import "../Css/Order.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Order = ({ address, setAddress, personalInfo, setPersonalInfo }) => {
  // const naviget = useNavigate();

  let mobile = 7875737703;

  // const [personalInfo, setpersonalInfo] = useState({
  //   firstName: user,
  //   lastName: "",
  //   mobile: mobile,
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit(address);
  //   naviget("/payment");
  // };

  return (
    <div className="order-form">
      {/* <h2>Enter Your Address</h2> */}
      <form>
        <label>
          First name :
          <input
            className="input"
            type="text"
            value={personalInfo.firstName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, firstName: e.target.value })
            }
            required
          />
        </label>
        <label>
          Last name :
          <input
            type="text"
            className="input"
            value={personalInfo.lastName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, lastName: e.target.value })
            }
            required
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            className="input"
            value={personalInfo.mobile}
            onChange={
              (e) =>
                setPersonalInfo({ ...personalInfo, mobile: e.target.value }) // Update personalInfo state
            }
            required
          />
        </label>

        <label>
          Street Address:
          <input
            type="text"
            className="input"
            value={address.StreetAddress}
            onChange={(e) =>
              setAddress({ ...address, StreetAddress: e.target.value })
            }
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            className="input"
            value={address.City}
            onChange={(e) => setAddress({ ...address, City: e.target.value })}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            className="input"
            value={address.State}
            onChange={(e) => setAddress({ ...address, State: e.target.value })}
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            className="input"
            value={address.ZipCode}
            onChange={(e) =>
              setAddress({ ...address, ZipCode: e.target.value })
            }
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            className="input"
            value={address.Country}
            onChange={(e) =>
              setAddress({ ...address, Country: e.target.value })
            }
            required
          />
        </label>
        {/* <button className="order-submit-button" type="submit">
          Confirm Order
        </button> */}
      </form>
    </div>
  );
};

export default Order;
