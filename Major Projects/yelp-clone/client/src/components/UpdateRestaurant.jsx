import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

function UpdateRestaurant() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate("/");
    } catch (error) {
      console.error("Error in handleSubmit of UpdateRestaurant", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Update Restaurant
          </h1>
          <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
            Make changes to the restaurant details below
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* Input 1: Name */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  className="px-4 py-2 sm:py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
                  placeholder="Name"
                  aria-label="Restaurant Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Input 2: Location */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  className="px-4 py-2 sm:py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
                  placeholder="Location"
                  aria-label="Restaurant Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Input 3: Price Range */}
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">
                  Price Range
                </label>
                <select
                  className="px-4 py-2 sm:py-3 border border-gray-200 bg-gray-50 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-smooth font-medium text-sm sm:text-base"
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
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  className="flex-1 bg-blue-600 text-white font-semibold py-2 sm:py-3 px-6 rounded-lg hover:bg-blue-700 active:scale-95 transition-smooth shadow-md hover:shadow-lg text-sm sm:text-base"
                  type="submit"
                >
                  Save Changes
                </button>
                <button
                  className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2 sm:py-3 px-6 rounded-lg hover:bg-gray-400 active:scale-95 transition-smooth shadow-md hover:shadow-lg text-sm sm:text-base"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRestaurant;
