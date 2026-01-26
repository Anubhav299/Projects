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
            <span className="text-yellow-300">{`(${restaurant.count})`}</span>
          </div>
        )}
        {!restaurant.average_rating && `No reviews yet`}
      </>
    );
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] shadow-md rounded-lg">
        <table className="w-full text-center text-gray-500 dark:text-gray-300">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=" text-white text-center">
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Restaurant
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Location
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Price Range
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Ratings
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Edit
              </th>
              <th
                scope="col"
                className="sticky top-0 z-10 bg-blue-600 px-6 py-3 font-semibold"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-gray-200">
            {restaurants &&
              restaurants.map((restaurant) => {
                return (
                  <tr
                    key={restaurant.id}
                    onClick={() => {
                      handleRestaurantSelect(restaurant.id);
                    }}
                    className="border-b border-gray-700 hover:bg-gray-700 transition duration-200 text-center "
                  >
                    <td className="px-6 py-4 font-medium text-white text-center">
                      {restaurant.name}
                    </td>
                    <td className="px-6 py-4">{restaurant.location}</td>
                    <td className="px-6 py-4">
                      {"₹".repeat(restaurant.price_range)}
                    </td>
                    <td className="px-6 py-4">{renderRating(restaurant)}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer font-bold py-2 px-4 rounded shadow-md transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdate(restaurant.id);
                        }}
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer font-bold py-2 px-4 rounded shadow-md transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(restaurant.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

            {/* Structure */}
            {/* <tr className="border-b border-gray-700 hover:bg-gray-700 transition duration-200 text-center">
              <td className="px-6 py-4 font-medium text-white text-center">
                McDonalds
              </td>
              <td className="px-6 py-4">New York</td>
              <td className="px-6 py-4">$$</td>
              <td className="px-6 py-4">Rating</td>

              <td className="px-6 py-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200">
                  Update
                </button>
              </td>
              <td className="px-6 py-4">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-200">
                  Delete
                </button>
              </td>
            </tr>*/}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantList;
