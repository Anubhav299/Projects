import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

function AddRestaurant() {
  const { addRestaurant } = useContext(RestaurantsContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.error("Error in handleSubmit of AddRestaurant", error);
    } finally {
      setName("");
      setLocation("");
      setPriceRange("");
    }
  };

  return (
    <div className="mb-3 sm:mb-4 animate-fade-in">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100 p-4 sm:p-5 hover:shadow-lg transition-smooth">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
          Add New Restaurant
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Input 1: Name */}
            <input
              type="text"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
              placeholder="Restaurant Name"
              aria-label="Restaurant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Input 2: Location */}
            <input
              type="text"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
              placeholder="Location"
              aria-label="Restaurant Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            {/* Input 3: Price Range */}
            <select
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
              aria-label="Price Range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option defaultValue>Price Range</option>
              <option value="1">₹</option>
              <option value="2">₹₹</option>
              <option value="3">₹₹₹</option>
              <option value="4">₹₹₹₹</option>
              <option value="5">₹₹₹₹₹</option>
            </select>

            {/* Button */}
            <button
              className="bg-blue-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-blue-700 active:scale-95 transition-smooth shadow-md hover:shadow-lg whitespace-nowrap text-sm sm:text-base"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRestaurant;
