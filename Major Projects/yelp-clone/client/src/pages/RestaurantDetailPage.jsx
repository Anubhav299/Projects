import { useContext, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";

function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  const fetchRestaurant = useCallback(async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [id, setSelectedRestaurant]);

  useEffect(() => {
    fetchRestaurant();
  }, [fetchRestaurant]);

  return (
    <>
      {selectedRestaurant && (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 py-3 sm:py-4 px-4 shadow-lg shrink-0">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                {selectedRestaurant.restaurant.name}
              </h1>

              <div className="flex justify-center items-center space-x-2 sm:space-x-3">
                <StarRating
                  rating={
                    Number(selectedRestaurant.restaurant.average_rating) || 0
                  }
                  readOnly
                />
                <span className="text-blue-100 font-semibold text-xs sm:text-base">
                  {`(${selectedRestaurant.restaurant.count} reviews)` ||
                    `(0 reviews)`}
                </span>
              </div>
            </div>
          </div>

          {/* Reviews Section - Scrollable */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
            <div className="max-w-6xl mx-auto">
              {selectedRestaurant.reviews.length > 0 ? (
                <>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Customer Reviews
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                    <ReviewCard reviews={selectedRestaurant.reviews} />
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-base">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add Review Section - Fixed at Bottom */}
          <div className="shrink-0 bg-white border-t border-gray-200 px-4 py-3 sm:py-4 shadow-lg">
            <div className="max-w-6xl mx-auto">
              <AddReview onReviewAdded={fetchRestaurant} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetailPage;
