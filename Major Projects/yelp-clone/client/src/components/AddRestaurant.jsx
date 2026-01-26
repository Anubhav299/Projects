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
    <div className="mb-4">
      <form action="">
        <div className="flex flex-col md:flex-row gap-4 center my-4 mx-5">
          {/* Input 1: Name */}
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            aria-label="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Input 2: Location */}
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
            aria-label="Restaurant Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Input 3: Price Range */}
          <select
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out w-full md:w-auto"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
