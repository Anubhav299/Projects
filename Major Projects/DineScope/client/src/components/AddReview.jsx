import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { useParams } from "react-router-dom";

function AddReview({ onReviewAdded }) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        rating,
        comment,
      });

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error("Error in handleSubmitReview of AddReview", error);
    } finally {
      setName("");
      setRating(0);
      setComment("");
    }
  };

  return (
    <div className="mb-0 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-smooth">
      <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
        Leave a Review
      </h2>
      <form onSubmit={handleSubmitReview}>
        <div className="flex flex-col gap-2">
          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="mb-0.5 text-xs sm:text-sm font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className="px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Rating Input */}
            <div className="flex flex-col">
              <label className="mb-0.5 text-xs sm:text-sm font-semibold text-gray-700">
                Rating
              </label>
              <div className="flex items-center h-full bg-gray-50 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm">
                <StarRating
                  rating={rating}
                  onChange={(newRating) => setRating(newRating)}
                />
              </div>
            </div>
          </div>

          {/* Review Textarea */}
          <div className="flex flex-col">
            <label className="mb-0.5 text-xs sm:text-sm font-semibold text-gray-700">
              Your Review
            </label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 sm:px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth resize-none font-medium text-sm"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="bg-blue-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-5 rounded-lg hover:bg-blue-700 active:scale-95 transition-smooth shadow-sm hover:shadow-md w-fit text-xs sm:text-sm"
            type="submit"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
