import React from "react";
import "../Css/Toaster.css";

const Toaster = ({ message, flag }) => {
  return <div className="toaster">{message}</div>;
};

export default Toaster;
