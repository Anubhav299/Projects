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
    <div>
      <form action="">
        <div className="flex flex-col gap-4 center my-7 mx-5">
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
          <div className="flex flex-row gap-4">
            <button
              className="w-fit bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              className="w-fit bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out"
              type="submit"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
