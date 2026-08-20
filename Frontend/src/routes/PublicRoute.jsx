import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const PublicRoute = () => {
  const { isAuthenticated, ready } = useAuthContext();

  if (!ready) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;