import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { auth } from "@/Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const registerUser = async (email: string, password: string) => {
    try {
      const resister = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return resister;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = { registerUser, user, loading };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
