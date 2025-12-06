import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductCardAdmin({ product, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl text-white mb-4 gap-4 w-full">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
      />

      {/* Product Info */}
      <div className="flex-1 ml-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-300">{product.category}</p>
        <p className="text-yellow-400 font-bold">${product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onEdit(product)}
          className="text-green-400 bg-gray-600 px-4 py-2 rounded hover:bg-blue-500 transition flex items-center gap-2"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(product)}
          className="text-rose-700 bg-gray-600 rounded px-4 py-2 hover:bg-red-500 transition flex items-center gap-2"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
