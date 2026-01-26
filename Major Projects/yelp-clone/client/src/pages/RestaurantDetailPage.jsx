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
        <div className="flex flex-col h-screen container mx-auto px-4">
          <div className="flex flex-col items-center pb-2 mb-4 border-b border-gray-300">
            <h1 className="text-center text-7xl font-bold my-5 shrink-0">
              {selectedRestaurant.restaurant.name}
            </h1>

            <div className="inline-flex items-center space-x-1 ">
              <StarRating
                rating={
                  Number(selectedRestaurant.restaurant.average_rating) || 0
                }
                readOnly
              />
              <span className="text-yellow-300">
                {`(${selectedRestaurant.restaurant.count})` || `(0)`}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pb-1 px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ReviewCard reviews={selectedRestaurant.reviews} />
            </div>
          </div>

          <div className="shrink-0 mt-4 bg-white pt-2 border-t border-gray-300">
            <AddReview onReviewAdded={fetchRestaurant} />
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantDetailPage;
