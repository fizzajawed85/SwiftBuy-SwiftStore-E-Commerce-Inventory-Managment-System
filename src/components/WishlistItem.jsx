import React from "react";
import { FaTrash, FaCartPlus } from "react-icons/fa";

export default function WishlistItem({ item, onRemove, onAddToCart }) {
  if (!item) return null; // safeguard

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl p-4 shadow-xl mb-4 gap-4">
      
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-xl"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-center px-4">
        <h3 className="text-yellow-400 font-bold text-lg">{item.name}</h3>
        <p className="text-white font-extrabold text-lg mt-1">${item.price}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onAddToCart(item)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-2xl shadow-md transition-all"
        >
          <FaCartPlus /> Add to Cart
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-2xl shadow-md transition-all"
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
}
