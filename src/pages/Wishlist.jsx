import React from "react";
import { useSelector, useDispatch } from "react-redux";
import WishlistItem from "../components/WishlistItem.jsx";
import { removeFromWishlist } from "../redux/slices/wishlistSlice.js";
import { addToCart } from "../redux/slices/cartSlice.js";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist) || [];
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // Optional: remove from wishlist
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-400">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.id}
              item={item} // pass correctly
              onRemove={(id) => dispatch(removeFromWishlist(id))}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
