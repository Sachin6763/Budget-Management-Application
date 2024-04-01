// import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./nComponents/Navbar";
import Login from "./nComponents/Login";
import Home from "./nComponents/Home";
import Register from "./nComponents/Register";
import AddTransactionForm from "./nComponents/ExpenseTracking";
import AddIncomeForm from "./nComponents/IncomeTracking";
import Summary from "./nComponents/Summary";
// import ProductList from "./Components/ProductList";
// import Order from "./Components/Order";
// import Cart from "./Components/Cart";

// import Payment from "./Components/Payment";
// import PaymentForm from "./Components/PaymentForm";

export default function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Retrieve user information from localStorage or sessionStorage during initial state setup
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loggedIn = (userId) => {
    setUser(userId);
    console.log("user " + userId);
    // Store user information in localStorage or sessionStorage when user logs in
    localStorage.setItem("user", JSON.stringify(userId));
  };

  const [activeTab, setActiveTab] = useState("home");

  // useEffect(() => {
  //   // console.log("executed");
  //   fetch("http://localhost:4000/api/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProducts(data);
  //       // console.log(products);
  //     })
  //     .catch((error) => console.error("Error fetching products: ", error));
  // }, []);

  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   // console.log("get" + user);
  //   fetch(`http://localhost:4000/api/cartDetails/${user}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("here" + data);
  //       setCartItems(data);
  //       // console.log(cartItems.length + "1");
  //     })
  //     .catch((error) => console.log("Error fetching products : ", error));
  // }, []);

  // const addToCart = (product, flag) => {
  //   // Make a request to addToCart API endpoint with the ProductID
  //   let productExistsInCart = false;
  //   for (let i = 0; i < cartItems.length; i++) {
  //     if (cartItems[i].ProductName === product.ProductName) {
  //       // console.log(cartItems[i].ProductName + " " + product.ProductName);
  //       productExistsInCart = true;
  //       if (flag === 0) {
  //         console.log("Already added !");
  //         return 1;
  //       }
  //       break;
  //     }
  //   }

  // setCartItems(...cartItems, {product.ProductID, product.ProductName, product.Price, cartDetail.Quantity}) ;

  //   if (!productExistsInCart) {
  //     console.log(product.ProductID + " " + user);
  //     fetch(`http://localhost:4000/api/addToCart/${product.ProductID}/${user}`)
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Item added to cart successfully.");
  //         } else {
  //           throw new Error("Failed to add item to cart.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error adding item to cart: ", error);
  //       });
  //   } else {
  //     const offset = 1;
  //     console.log(product.ProductID + " " + product.ProductName);
  //     fetch(
  //       `http://localhost:4000/api/modifyCart/${product.productID}/${offset}/${user}`
  //     )
  //       .then((responce) => {
  //         if (responce.ok) {
  //           console.log("Item modified to cart successfully.");
  //         } else {
  //           throw new Error("Failed to modify item to cart.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error modifying item to cart: ", error);
  //       });
  //   }

  //   fetch(`http://localhost:4000/api/cartDetails/${user}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCartItems(data);
  //       console.log(data);
  //     })

  //     .catch((error) => console.log("Error fetching products : ", error));
  //   return 0;
  // };
  // const decreaseQuantity = (product) => {
  //   const existingProductIndex = cartItems.findIndex(
  //     (item) => item.productID === product.productID
  //   );

  //   if (existingProductIndex !== -1) {
  //     const updatedCartItems = [...cartItems];
  //     if (updatedCartItems[existingProductIndex].Quantity > 1) {
  //       updatedCartItems[existingProductIndex].Quantity -= 1;
  //       setCartItems(updatedCartItems);
  //       let offset = -1;
  //       fetch(
  //         `http://localhost:4000/api/modifyCart/${product.productID}/${offset}/${user}`
  //       )
  //         .then((responce) => {
  //           if (responce.ok) {
  //             console.log("Item modified to cart successfully.");
  //           } else {
  //             throw new Error("Failed to modify item to cart.");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error modifying item to cart: ", error);
  //         });
  //     }
  //   }
  // };

  // const removeFromCart = (product) => {
  //   const updatedCartItems = cartItems.filter(
  //     (item) => item.productID !== product.productID
  //   );
  //   setCartItems(updatedCartItems);
  //   fetch(
  //     `http://localhost:4000/api/removeProductFromCart/${product.productID}/${user}`
  //   )
  //     .then((responce) => {
  //       if (responce.ok) {
  //         console.log("Item removed from Cart successfully.");
  //       } else {
  //         throw new Error("Failed to remove Item from the cart.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error int removing the item from cart: ", error);
  //     });
  //   // addToCardArray(updatedCartItems);
  // };

  // const [address, setAddress] = useState({
  //   UserID: user,
  //   StreetAddress: "",
  //   City: "",
  //   State: "",
  //   ZipCode: "",
  //   Country: "",
  // });

  // const [showAddressForm, setShowAddressForm] = useState(true);

  // // const handleOrder = useCallback(() => {
  // //   // navigate("/order");
  // // });

  // const handleAddressSubmit = (addressData) => {
  //   setAddress(addressData);

  //   fetch("http://localhost:4000/api/storeAddress/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(addressData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Address sent to server successfully!");
  //       } else {
  //         throw new Error("Failed to send address to server");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error sending address to server: ", error);
  //     });
  //   console.log(addressData);
  //   setShowAddressForm(false);
  // };

  return (
    <Router>
      <Navbar
        user={user}
        setUser={setUser}
        // onLogout={loggedOut}
        // setActiveTab={setActiveTab}
        // cartItems={cartItems}
      />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/home" element={<Home user={user} />} />

          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/expense_tracking"
            element={<AddTransactionForm Username={user} />}
          />
          <Route
            path="/income_tracking"
            element={<AddIncomeForm Username={user} />}
          />
          <Route path="/summary" element={<Summary Username={user} />} />

          {/* <Route path="/payment" element={<Payment />} /> */}
        </Routes>
      </div>
      {/* <InteractiveBackground /> */}
    </Router>
  );
}
