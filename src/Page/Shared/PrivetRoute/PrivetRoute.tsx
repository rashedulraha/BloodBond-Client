import useAuth from "@/Hook/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

type Children = {
  children: React.ReactNode;
};

const PrivetRoute = ({ children }: Children) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log(location.pathname);

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname} />;
};

export default PrivetRoute;
