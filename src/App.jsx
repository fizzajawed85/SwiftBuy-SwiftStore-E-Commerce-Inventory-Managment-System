// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase/config.js";
import { loginSuccess, logout } from "./redux/slices/authSlice.js";
import { onAuthStateChanged } from "firebase/auth";

// Public Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Contact from "./pages/Contact.jsx";

// Protected Pages
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Categories from "./pages/admin/Categories.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./components/AdminProtectedRoute.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Layout
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-6">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Admin state
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // Firebase auth listener for normal users
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          loginSuccess({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* Auth Pages */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />}
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute adminLoggedIn={adminLoggedIn}>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute adminLoggedIn={adminLoggedIn}>
              <Products />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute adminLoggedIn={adminLoggedIn}>
              <Orders />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute adminLoggedIn={adminLoggedIn}>
              <Categories />
            </ProtectedAdminRoute>
          }
        />

        {/* Admin catch-all */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}
