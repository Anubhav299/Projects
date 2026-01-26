import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await RestaurantFinder.get("/");

        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.error("Error in useEffect", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        }),
      );
    } catch (error) {
      console.error("Error in handleDelete in RestaurantList", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      navigate(`/restaurants/${id}/update`);
    } catch (error) {
      console.error("Error in handleDelete in RestaurantList", error);
    }
  };

  const handleRestaurantSelect = (id) => {
    try {
      navigate(`/restaurants/${id}`);
    } catch (error) {
      console.error("Error in handleDelete in RestaurantList", error);
    }
  };

  const renderRating = (restaurant) => {
    return (
      <>
        {restaurant.average_rating && (
          <div className="inline-flex items-center space-x-1">
            <StarRating rating={Number(restaurant.average_rating)} readOnly />
            <span className="text-amber-500 font-medium">{`(${restaurant.count})`}</span>
          </div>
        )}
        {!restaurant.average_rating && (
          <span className="text-gray-400">No reviews</span>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="overflow-x-auto overflow-y-auto max-h-full shadow-lg rounded-lg sm:rounded-xl border border-gray-100">
        <table className="w-full text-center text-xs sm:text-sm">
          <thead>
            <tr className="text-white">
              <th
                scope="col"
                className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 px-2 sm:px-4 py-2 sm:py-3 font-semibold text-left"
              >
                Restaurant
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 px-2 sm:px-4 py-2 sm:py-3 font-semibold"
              >
                Location
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 px-2 sm:px-4 py-2 sm:py-3 font-semibold"
              >
                Price
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 px-2 sm:px-4 py-2 sm:py-3 font-semibold"
              >
                Rating
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-linear-to-r from-blue-600 to-blue-500 px-2 sm:px-4 py-2 sm:py-3 font-semibold"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    key={restaurant.id}
                    onClick={() => {
                      handleRestaurantSelect(restaurant.id);
                    }}
                    className="hover:bg-blue-50 transition-smooth cursor-pointer group"
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-900 text-left group-hover:text-blue-600 transition-smooth">
                      {restaurant.name}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 truncate">
                      {restaurant.location}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 font-medium">
                      {"₹".repeat(restaurant.price_range)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      {renderRating(restaurant)}
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <div className="flex gap-1 sm:gap-2 justify-center">
                        <button
                          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1 sm:py-2 px-2 sm:px-3 rounded shadow-md hover:shadow-lg transition-smooth active:scale-95 text-xs sm:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdate(restaurant.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 sm:py-2 px-2 sm:px-3 rounded shadow-md hover:shadow-lg transition-smooth active:scale-95 text-xs sm:text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(restaurant.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantList;
