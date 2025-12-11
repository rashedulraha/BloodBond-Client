import AuthLayout from "@/Layout/Auth/AuthLayout";
import Dashboard from "@/Layout/Dashboard/Dashboard";
import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
import LoginPage from "@/Page/Auth/Login/Login";
import RegisterPage from "@/Page/Auth/Register/RegisterPage";
import Home from "@/Page/Home/Home";
import Profile from "@/Page/Profile/Profile";
import PrivetRoute from "@/Page/Shared/PrivetRoute/PrivetRoute";
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
      {
        path: "profile",
        element: (
          <PrivetRoute>
            <Profile />
          </PrivetRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [{}],
  },
]);

export default router;
