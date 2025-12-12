// src/context/AuthContext.tsx

import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

// and fixing the logOutUser type which should be a function that returns Promise<void> or Promise<void | string>.

export type UserInfoType = {
  // Authentication State
  user: User | undefined;
  loading: boolean;

  // Auth Methods
  registerUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;

  loginUser: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;

  signinWithGoogle: () => Promise<UserCredential | string | undefined>;

  logOutUser: () => Promise<void>; // signOut returns Promise<void>

  profileUpdate: (userInformation: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void | string>; // updateProfile returns Promise<void> or error string
};

// Context value is either UserInfoType or undefined initially (used with a check in useAuth)
const AuthContext = createContext<UserInfoType | undefined>(undefined);

export default AuthContext;
