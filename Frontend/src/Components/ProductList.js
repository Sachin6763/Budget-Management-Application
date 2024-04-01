import { React, useState } from "react";
import ProductCard from "./ProductCard";
import "../Css/ProductCardProductList.css";

const ProductList = ({ products, onAddToCart }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.ProductID}
          product={product}
          onAddToCart={onAddToCart}
          setShowToast={setShowToast}
          setMessage={setMessage}
          showToast={showToast}
        />
      ))}
      {showToast && <div className="toaster">{message}</div>}
    </div>
  );
};

export default ProductList;
