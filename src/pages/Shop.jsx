import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loadProducts } from "../redux/slices/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Shop() {
  const dispatch = useDispatch();

  // ✅ Use 'products' slice (plural) to match your Redux slice name
  const productState = useSelector(
    (state) => state.products || { items: [], loading: false },
    shallowEqual
  );
  const { items: products, loading } = productState;

  // Fetch products on mount
  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-center py-16 px-4 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Shop Products
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
          Browse our premium collection. Add to cart, wishlist, and enjoy a seamless shopping experience.
        </p>
        {/* Decorative circles */}
        <span className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></span>
        <span className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></span>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-400">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
