// src/App.jsx
import React, { useEffect } from "react";
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
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard.jsx";
import Products from "./pages/admin/Products.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Categories from "./pages/admin/Categories.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Layout wrapper for Public pages
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

  // Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

          {/* Public catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* Admin Routes (Protected, no layout here) */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="/admin/products" element={
          <ProtectedRoute user={user}>
            <Products />
          </ProtectedRoute>
        }/>
        <Route path="/admin/orders" element={
          <ProtectedRoute user={user}>
            <Orders />
          </ProtectedRoute>
        }/>
        <Route path="/admin/categories" element={
          <ProtectedRoute user={user}>
            <Categories />
          </ProtectedRoute>
        }/>

        {/* Admin catch-all */}
        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Router>
  );
}
