import { createContext } from "react";

type UserInfoType = {
  name: string;
};

const AuthContext = createContext<UserInfoType | null>(null);

export default AuthContext;
