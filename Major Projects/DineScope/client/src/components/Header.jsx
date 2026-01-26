import React from "react";

function Header() {
  return (
    <div className="bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 py-4 sm:py-6 shadow-lg animate-fade-in shrink-0">
      <h1 className="text-3xl sm:text-5xl md:text-6xl text-center font-bold text-white tracking-tight">
        DineScope
      </h1>
      <p className="text-center text-blue-100 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-light">
        Discover amazing restaurants near you
      </p>
    </div>
  );
}

export default Header;
