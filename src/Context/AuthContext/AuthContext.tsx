import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

export type UserInfoType = {
  registerUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  loginUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  user: User | undefined;
  loading: boolean;
};

const AuthContext = createContext<UserInfoType | undefined>(undefined);

export default AuthContext;
