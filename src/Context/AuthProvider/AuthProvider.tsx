import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { auth } from "@/Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from "firebase/auth";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // --- Register User ---
  const registerUser = async (
    email: string,
    password: string
  ): Promise<UserCredential | undefined> => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // --- Track Auth State ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser || undefined);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Value passed to Context ---
  const userInfo = {
    registerUser,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
