// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-6">

        {/* Brand Info */}
        <div>
          <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-white text-2xl mb-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2L5 6H1v2h1l2 14h16l2-14h1V6h-4L18 2H6zm2 4h8v2H8V6zm-1.5 4h11l-1.5 10h-8l-1.5-10z" />
              </svg>
            </div>
            <span>SwiftBuy</span>
          </Link>
          <p className="text-gray-200 mt-2">Your trusted shopping partner.</p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="text-accent font-semibold mb-2">Shop</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/shop" className="hover:text-yellow-400">Men</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-yellow-400">Women</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-yellow-400">Kids</Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-accent font-semibold mb-2">Support</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400">FAQ</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">Help</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
  <h4 className="text-accent font-semibold mb-2">Follow Us</h4>
  <div className="flex gap-4">
    <FaFacebook size={28} className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors" />
    <FaTwitter size={28} className="text-sky-400 hover:text-sky-600 cursor-pointer transition-colors" />
    <FaInstagram size={28} className="text-pink-500 hover:text-pink-700 cursor-pointer transition-colors" />
  </div>
</div>

      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-6" />

      {/* Footer Text */}
      <p className="text-center text-gray-300">
        © 2025 SwiftBuy. All rights reserved.
      </p>
    </footer>
  );
}
