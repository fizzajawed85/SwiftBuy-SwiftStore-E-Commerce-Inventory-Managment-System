import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { addToWishlist } from "../redux/slices/wishlistSlice.js";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id.toString() === id)
  );

  if (!product) {
    return <div className="text-center mt-20">Product not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg max-h-[400px] object-cover shadow-lg"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{product.title}</h2>
        <p className="text-gray-400">{product.category}</p>
        <p className="text-xl font-semibold">${product.price}</p>
        <p className="text-gray-300">{product.description}</p>
        <p className="text-green-400">Stock: {product.stock}</p>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded-md transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => dispatch(addToWishlist(product))}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-gray-100 font-semibold py-2 rounded-md transition"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
