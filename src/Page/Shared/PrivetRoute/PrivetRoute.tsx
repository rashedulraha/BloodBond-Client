import useAuth from "@/Hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";

type Children = {
  children: React.ReactNode;
};

const PrivetRoute = ({ children }: Children) => {
const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }
  return children;
};

export default PrivetRoute;
