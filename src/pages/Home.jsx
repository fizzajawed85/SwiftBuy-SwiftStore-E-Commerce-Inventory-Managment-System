// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { loadProducts } from "../redux/slices/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Correct slice name: 'products'
  const productState = useSelector(
    (state) => state.products || { items: [], loading: false, error: null }
  );
  const { items: products, loading, error } = productState;

  // Extract unique categories and limit to 4
  const categories = Array.from(new Set(products.map((p) => p.category))).slice(0, 4);

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const displayedProducts = filteredProducts.slice(0, 4); // Only 4 products

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, products.length]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Hero />

      {/* Categories Section */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Heading + Description */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            {selectedCategory ? selectedCategory : "Featured Products"}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl">
            Browse our {selectedCategory ? selectedCategory : "exclusive selection of premium products"}.
            Select a category above to filter and explore products tailored for you.
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Loading / Error / Empty States */}
        {loading && <p className="text-center text-gray-400">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && displayedProducts.length === 0 && (
          <p className="text-center text-gray-400">No products available.</p>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {!loading &&
            !error &&
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {/* See More Button */}
        {filteredProducts.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/shop")}
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition transform hover:scale-105"
            >
              See More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
