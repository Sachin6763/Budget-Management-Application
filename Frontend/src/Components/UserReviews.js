import React, { useState } from "react";
import "../Css/OrderSummaryReviewForm.css";

const ReviewForm = () => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    // Handle review submission logic using API calls (Axios) to your backend
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <textarea
        placeholder="Your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default ReviewForm;
