import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice.js";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice.js";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // ✅ CORRECT SELECTORS
  const cart = useSelector((state) => state.cart.cart || []);
  const wishlist = useSelector((state) => state.wishlist.wishlist || []);

  const inCart = cart.find((item) => item.id === product.id);
  const inWishlist = wishlist.find((item) => item.id === product.id);

  const [qty, setQty] = useState(inCart?.quantity || 1);

  const increment = () => qty < product.stock && setQty(qty + 1);
  const decrement = () => qty > 1 && setQty(qty - 1);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  const handleWishlist = () => {
    if (inWishlist) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2 p-4">
        <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
        <p className="text-gray-300 text-sm capitalize">{product.category}</p>

        <hr className="my-2 border-gray-600" />

        <p className="text-yellow-400 font-bold text-lg">${product.price}</p>
        <p className="text-gray-300 text-sm line-clamp-3">{product.description}</p>
      </div>

      {/* Quantity + Cart + Wishlist */}
      <div className="flex items-center justify-between px-4 pb-4 pt-2 gap-2">

        {/* Quantity */}
        <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden text-blue-400 font-semibold">
          <button onClick={decrement} className="px-3 py-2 hover:opacity-80">-</button>
          <span className="px-4">{qty}</span>
          <button onClick={increment} className="px-3 py-2 hover:opacity-80">+</button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-gray-700 p-3 rounded-lg hover:opacity-80"
          >
            <FaShoppingCart size={18} className="text-yellow-500" />
          </button>

          <button
            onClick={handleWishlist}
            className="bg-gray-700 p-3 rounded-lg hover:opacity-80"
          >
            {inWishlist ? (
              <FaHeart size={18} className="text-pink-500" />
            ) : (
              <FaRegHeart size={18} className="text-pink-500" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
