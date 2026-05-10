import React from "react";
import { Navigate } from "react-router-dom";

// Guards pages that require authentication.
// Requires BOTH userEmail and token to be present in localStorage.
const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  if (!userEmail || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
