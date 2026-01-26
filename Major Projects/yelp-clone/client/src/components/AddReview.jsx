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
    <div className="mb-4">
      <form onSubmit={handleSubmitReview}>
        <div className="flex flex-col gap-4 my-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Rating Input */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex items-center h-full">
                <StarRating
                  rating={rating}
                  onChange={(newRating) => setRating(newRating)}
                />
              </div>
            </div>
          </div>

          {/* Review Textarea */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition w-fit"
            type="submit"
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
