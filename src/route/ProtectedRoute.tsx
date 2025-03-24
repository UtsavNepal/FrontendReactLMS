import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../infrastructure/context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); 

  if (!isAuthenticated) {
 
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;