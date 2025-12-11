import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import AuthProvider from "./Context/AuthProvider/AuthProvider";

AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer />
  </StrictMode>
);
