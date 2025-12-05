import type { ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const userInfo = {
    name: "RashedulRaha",
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
