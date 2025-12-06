// src/pages/About.jsx
import React from "react";
import { FaShippingFast, FaBoxes, FaHeadset } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 p-16 text-center overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          About SwiftBuy
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto">
          SwiftBuy is your premium e-commerce platform for a seamless shopping
          experience. Discover products, add to cart, wishlist, and enjoy
          lightning-fast checkout.
        </p>
        {/* Decorative circles */}
        <span className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></span>
        <span className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></span>
      </div>

      {/* Features / Highlights Section */}
      <div className="p-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <FaShippingFast className="text-purple-500 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-2 text-center">Fast Delivery</h2>
          <p className="text-gray-300 text-center">
            Lightning-fast shipping ensures your products reach you in record
            time.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <FaBoxes className="text-pink-500 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-2 text-center">Wide Range</h2>
          <p className="text-gray-300 text-center">
            Explore thousands of products across multiple categories at great
            prices.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
          <FaHeadset className="text-red-500 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-2 text-center">24/7 Support</h2>
          <p className="text-gray-300 text-center">
            Our friendly support team is always ready to help with any query.
          </p>
        </div>
      </div>

      {/* Mission / Info Section */}
      <div className="bg-gray-800 p-12 mt-16 text-center rounded-xl max-w-5xl mx-auto shadow-lg">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Our Mission
        </h3>
        {/* Accent line */}
        <div className="w-20 h-1 mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mb-6"></div>
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
          At SwiftBuy, our mission is to redefine online shopping by making it fast,
          intuitive, and enjoyable. We focus on quality products, excellent service,
          and a smooth experience for every customer. Our goal is to provide a seamless
          shopping journey that delights every user.
        </p>
      </div>

      {/* Decorative Bottom */}
      <div className="relative mt-12">
        <span className="absolute top-0 left-1/4 w-64 h-64 bg-purple-700/20 rounded-full -z-10"></span>
        <span className="absolute bottom-0 right-1/3 w-80 h-80 bg-pink-600/20 rounded-full -z-10"></span>
      </div>
    </div>
  );
}
