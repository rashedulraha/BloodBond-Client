import AuthContext from "@/Context/AuthContext/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  const userInfo = useContext(AuthContext);
  return userInfo;
};

export default useAuth;
