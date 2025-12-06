// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  // Agar user login nahi hai → login page pe redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
