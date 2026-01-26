import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantList";

function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Header />
      <div className="px-4 flex-shrink-0">
        <AddRestaurant />
      </div>
      <div className="flex-1 min-h-0 px-4">
        <RestaurantList />
      </div>
    </div>
  );
}

export default HomePage;
