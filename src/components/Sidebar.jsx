import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaTags,
  FaShoppingBag,
  FaSignOutAlt,
  FaStore,
  FaHome,
  FaBars,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // useNavigate import kiya

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); // redirect ke liye

  const links = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { name: "Categories", icon: <FaTags />, path: "/admin/categories" },
    { name: "Shop", icon: <FaShoppingBag />, path: "/shop" },
    { name: "Home", icon: <FaHome />, path: "/" },
  ];

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin"); // admin session clear
    navigate("/admin/login"); // admin login page par redirect
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen w-64 shadow-xl">
        <div className="flex items-start justify-start p-4 border-b border-gray-700 mb-6">
          <FaStore className="text-yellow-400 text-2xl" />
          <h1 className="text-xl font-bold text-yellow-400 ml-2">SwiftStore</h1>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition hover:bg-yellow-500 hover:text-gray-900
                ${isActive ? "bg-yellow-500 text-gray-900" : "text-gray-200"}`
              }
            >
              <div className="text-lg">{link.icon}</div>
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout} // logout function call
          className="flex items-center bg-gray-700 gap-4 p-3 m-4 rounded-lg hover:bg-gray-600 transition"
        >
          <FaSignOutAlt className="text-red-500 text-lg" />
          <span className="font-medium text-red-500">Logout</span>
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gradient-to-b from-gray-900 to-gray-800 p-4">
        <div className="flex items-center gap-2">
          <FaStore className="text-yellow-400 text-2xl" />
          <h1 className="text-xl font-bold text-yellow-400">SwiftStore</h1>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-yellow-400 p-2 rounded-md hover:bg-gray-700 transition"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col p-4 gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)} // close menu on click
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-lg transition hover:bg-yellow-500 hover:text-gray-900
                ${isActive ? "bg-yellow-500 text-gray-900" : "text-gray-200"}`
              }
            >
              <div className="text-lg">{link.icon}</div>
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout} // mobile logout
            className="flex items-center bg-gray-700 gap-4 p-3 rounded-lg hover:bg-gray-600 transition mt-2"
          >
            <FaSignOutAlt className="text-red-500 text-lg" />
            <span className="font-medium text-red-500">Logout</span>
          </button>
        </div>
      )}
    </>
  );
}
