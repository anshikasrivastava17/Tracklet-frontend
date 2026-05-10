import React from "react";
import { Navigate } from "react-router-dom";

/**
 * PrivateRoute — guards pages that require authentication.
 *
 * Requires BOTH userEmail and token to be present in localStorage.
 * If either is missing the user is redirected to /login.
 *
 * Note: This is a navigation guard only — it does not validate token expiry.
 * Expired tokens are rejected by the backend APIs which return 401, at which
 * point the user should be redirected to login by the consuming component.
 */
const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  if (!userEmail || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
