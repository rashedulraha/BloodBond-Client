import { useEffect } from "react";
import useAuth from "@/Hook/useAuth";
import useRole from "@/Hook/useRole";

import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

type Children = {
  children: React.ReactNode;
};

const AdminPrivetRoute = ({ children }: Children) => {
  const { role, loading: roleLoading } = useRole();
  const { loading: authLoading, logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !roleLoading && role !== "admin") {
      logOutUser().then(() => {
        navigate("/login", { replace: true });
      });
    }
  }, [authLoading, roleLoading, role, logOutUser, navigate]);

  if (authLoading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default AdminPrivetRoute;
