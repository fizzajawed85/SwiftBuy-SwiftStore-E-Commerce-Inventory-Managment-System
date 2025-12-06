import React from "react";

export default function Categories({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Shop by Category
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
          Explore our wide range of product categories and find exactly what you're looking for.
        </p>

        {/* Divider */}
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => onSelectCategory(cat)}
            className={`bg-rose-800 text-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:bg-rose-500 transition-all duration-300 cursor-pointer flex items-center justify-center font-semibold text-lg text-center
              ${selectedCategory === cat ? "ring-4 ring-yellow-500" : ""}
            `}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
