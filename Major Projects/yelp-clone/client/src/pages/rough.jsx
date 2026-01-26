import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";

function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  const [userRating, setUserRating] = useState(0); // for adding new review
  const [reviews, setReviews] = useState([]);      // store existing reviews

  // Fetch restaurant data and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const restaurant = response.data.data.restaurant;
        setSelectedRestaurant(restaurant);

        // Assuming restaurant has a reviews array
        setReviews(restaurant.reviews || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  // Example submit handler for a new review
  const handleSubmitReview = () => {
    // Replace with actual API call
    console.log("Submitting rating:", userRating);
    // Reset user rating after submit
    setUserRating(0);
  };

  if (!selectedRestaurant) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{selectedRestaurant.name}</h1>

      {/* Existing reviews */}
      <div className="mt-6">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            title={review.title}
            image={review.image}
            rating={review.rating}
            reviewText={review.text}
          />
        ))}
      </div>

      {/* Add new review */}
      <div className="mt-10 p-4 border border-slate-300 rounded-lg max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Add Your Review</h2>
        <StarRating rating={userRating} onChange={setUserRating} />
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
        <p className="mt-2 text-sm text-slate-600">
          Your rating: {userRating}
        </p>
      </div>
    </div>
  );
}

export default RestaurantDetailPage;
