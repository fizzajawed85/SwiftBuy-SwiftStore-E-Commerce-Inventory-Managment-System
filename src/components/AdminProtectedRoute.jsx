// src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ adminLoggedIn, children }) {
  if (!adminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
