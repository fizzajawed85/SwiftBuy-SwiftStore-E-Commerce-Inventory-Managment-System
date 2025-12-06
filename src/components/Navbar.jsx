// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((s) => s.cart.cart.reduce((acc, i) => acc + (i.quantity || 1), 0));
  const wishlistCount = useSelector((s) => s.wishlist.wishlist.length);
  const user = useSelector((s) => s.auth.user);

  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function onDoc(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 pt-6 pb-6">

          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-white text-2xl">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2L5 6H1v2h1l2 14h16l2-14h1V6h-4L18 2H6zm2 4h8v2H8V6zm-1.5 4h11l-1.5 10h-8l-1.5-10z" />
                </svg>
              </div>
              <span>SwiftBuy</span>
            </Link>
          </div>

          {/* Center: Nav Links (desktop) */}
          <ul className="hidden md:flex gap-8 font-semibold text-white items-center">
            {["/", "/about", "/shop", "/contact"].map((path, i) => {
              const name = ["Home", "About", "Shop", "Contact"][i];
              return (
                <li key={i}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `px-2 py-1 rounded ${isActive ? "text-yellow-400" : "hover:text-yellow-300 transition"}`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Right: Icons + Hamburger */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile & Desktop Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link to="/cart" className="relative hover:text-yellow-400 transition">
                <FaShoppingCart size={22} className="text-accent" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-yellow-400 text-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/wishlist" className="relative hover:text-pink-400 transition">
                <FaHeart size={22} className="text-pink-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-400 text-gray-900 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Profile with dropdown arrow */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-1 px-2 py-1 rounded"
                >
                  <FaUser size={20} className="text-blue-400" />
                  <FaCaretDown size={14} className={`transition-transform ${profileOpen ? "rotate-180" : "rotate-0"} text-blue-400 `} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/30 overflow-hidden">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => { setProfileOpen(false); setMenuOpen(false); }}
                      className="block px-4 py-2 hover:bg-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger (mobile only) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                aria-label="Toggle menu"
                className="p-2 rounded hover:bg-gray-700 transition"
              >
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (links only) */}
      <div
        className={`md:hidden bg-gray-800 overflow-hidden transition-all ${menuOpen ? "max-h-[500px] py-4" : "max-h-0"}`}
      >
        <div className="px-4 space-y-2">
          {["/", "/about", "/shop", "/contact"].map((path, i) => {
            const name = ["Home", "About", "Shop", "Contact"][i];
            return (
              <NavLink
                key={i}
                onClick={() => setMenuOpen(false)}
                to={path}
                className="block px-2 py-2 rounded hover:bg-gray-700"
              >
                {name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
