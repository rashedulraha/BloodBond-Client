import { useEffect, useState, type ReactNode } from "react";

import { auth } from "@/Firebase/Firebase.init"; // Assuming this path is correct

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import type { UserInfoType } from "../AuthContext/AuthContext";
import AuthContext from "../AuthContext/AuthContext";

// --- [ Props Type ] ---
type AuthProviderProps = {
  children: ReactNode;
};

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  // Custom user info might include database fields like 'role', 'status'
  // const [user, setUser] = useState<(User & { role?: string, status?: string }) | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. --- Register User ---
  const registerUser: UserInfoType["registerUser"] = async (
    email,
    password
  ) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Register Error:", error.message);
      }
      return undefined; // Return undefined on failure
    }
  };

  // 2. --- Login User ---
  const loginUser: UserInfoType["loginUser"] = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return signInUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
      }
      return undefined; // Return undefined on failure
    }
  };

  // 3. --- Signin with Google ---
  const signinWithGoogle: UserInfoType["signinWithGoogle"] = async () => {
    try {
      const loginUser = await signInWithPopup(auth, googleProvider);
      return loginUser;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google Signin Error:", error.message);
        return error.message; // Return error message string
      }
      return undefined;
    }
  };

  // 4. --- Logout user ---
  const logOutUser: UserInfoType["logOutUser"] = async () => {
    try {
      setLoading(true);
      await signOut(auth); // signOut returns Promise<void>
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Logout Error:", error.message);
      }
    }
  };

  // 5. --- Update profile ---
  const profileUpdate: UserInfoType["profileUpdate"] = async (userInformation: {
    displayName?: string | null;
    photoURL?: string | null;
  }) => {
    try {
      // Firebase updateProfile returns Promise<void>
      await updateProfile(auth.currentUser!, userInformation);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Profile Update Error:", error.message);
        return error.message; // Return error message string
      }
      return String(error);
    }
  };

  // --- Track Auth State ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      // 💡 Better Practice: Only set loading to false after state is resolved
      setUser(currentUser || undefined);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Value passed to Context ---
  const userInfo: UserInfoType = {
    registerUser,
    user,
    loading,
    logOutUser,
    loginUser,
    signinWithGoogle,
    profileUpdate,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
