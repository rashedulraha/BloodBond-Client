import AuthLayout from "@/Layout/Auth/AuthLayout";
import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
import LoginPage from "@/Page/Auth/Login/Login";
import RegisterPage from "@/Page/Auth/Register/RegisterPage";
import Home from "@/Page/Home/Home";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: RegisterPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
]);

export default router;
