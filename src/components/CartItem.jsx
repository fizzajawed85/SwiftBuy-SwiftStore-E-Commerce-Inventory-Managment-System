import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export default function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-800  rounded-2xl p-4 shadow-xl mb-4 gap-4">

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
        <h3 className="text-white font-bold text-lg">{item.name}</h3>
        <p className="text-yellow-400 font-extrabold text-lg mt-1">${item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-gray-700 rounded-xl p-2">
        <button
          onClick={() => onDecrease(item)}
          className=" hover:bg-gray-500 text-white rounded-full p-2 transition-all shadow-sm"
        >
          <FaMinus />
        </button>
        <span className="px-4 py-1  rounded-lg font-semibold text-white">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item)}
          className=" hover:bg-gray-500 text-white rounded-full p-2 transition-all shadow-sm"
        >
          <FaPlus />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-2xl shadow-md transition-all"
      >
        <FaTrash /> Remove
      </button>
    </div>
  );
}
