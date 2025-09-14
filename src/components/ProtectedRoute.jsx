import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚀 Redirect instead of alert
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
