import React from "react";
import { Navigate } from "react-router-dom";

// Protect routes for admin-only access.
// Checks localStorage.isAdmin === '1' and token presence.
const ProtectedAdminRoute = ({ children }) => {
  try {
    const isAdmin =
      typeof window !== "undefined" && localStorage.getItem("isAdmin");
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (isAdmin === "1" && token) return children;
  } catch (e) {
    // ignore
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;
