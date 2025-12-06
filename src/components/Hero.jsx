import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/config.js";
import { ref, get } from "firebase/database";

export default function Hero() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch first 4 product images from Firebase
  useEffect(() => {
    async function fetchImages() {
      try {
        const productsRef = ref(database, "products");
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const allProducts = Object.values(snapshot.val());
          const firstFourImages = allProducts.slice(0, 4).map(p => p.image);
          setImages(firstFourImages);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    }
    fetchImages();
  }, []);

  // Rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="relative w-full bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white py-8 md:py-12 px-4 md:px-8 rounded-3xl overflow-hidden">

      {/* Decorative circles */}
      <span className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></span>
      <span className="absolute bottom-0 right-0 w-[38rem] h-[38rem] bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 animate-pulse-slow"></span>

      <div className="max-w-7xl mx-auto grid gap-8 items-center relative z-10
                      md:grid-cols-2 md:items-center">

        {/* Right Image (mobile first) */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          {images.length > 0 && (
            <img
              src={images[currentImage]}
              alt="Product"
              className="w-80 h-80 md:w-[32rem] md:h-[32rem] object-cover rounded-2xl transition-all duration-500"
            />
          )}
        </div>

        {/* Left Text */}
        <div className="space-y-6 md:space-y-8 order-2 md:order-1">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Shop Smarter. <span className="text-yellow-400">Live Better.</span>
          </h1>
          <p className="text-gray-100 text-lg md:text-xl max-w-lg">
            Discover premium products with fast delivery, secure checkout, and best prices.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-yellow-500 text-black px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-yellow-400 transition transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>

      </div>
    </section>
  );
}
