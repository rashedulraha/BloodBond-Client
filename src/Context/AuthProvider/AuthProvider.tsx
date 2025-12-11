import { useEffect, useState, type ReactNode } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { auth } from "@/Firebase/Firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from "firebase/auth";

type AuthProviderProps = {
  children: ReactNode;
};
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  //! --- Register User ---
  const registerUser = async (
    email: string,
    password: string
  ): Promise<UserCredential | undefined> => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // ! login user
  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return signInUser;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // ! signin with google
  const signinWithGoogle = async () => {
    try {
      const loginUser = await signInWithPopup(auth, googleProvider);
      return loginUser;
    } catch (error: unknown) {
      return error.message;
    }
  };

  //! --- Logout user ---
  const logOutUser = async () => {
    try {
      setLoading(true);
      signOut(auth);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //! --- Track Auth State ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser || undefined);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //! --- Value passed to Context ---
  const userInfo = {
    registerUser,
    user,
    loading,
    logOutUser,
    loginUser,
    signinWithGoogle,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
