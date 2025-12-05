import AuthContext from "@/Context/AuthContext/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const useInfo = useContext(AuthContext);
  return useInfo;
};

export default useAuth;
