import AuthLayout from "@/Layout/Auth/AuthLayout";
import Dashboard from "@/Layout/Dashboard/Dashboard";
import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
import LoginPage from "@/Page/Auth/Login/Login";
import RegisterPage from "@/Page/Auth/Register/RegisterPage";
import CreateDonationRequest from "@/Page/Dashboard/CreateDonationRequest/CreateDonationRequest";
import Profile from "@/Page/Dashboard/Profile/Profile";

import WelcomePage from "@/Page/Dashboard/WelcomePage/WelcomePage";
import DonationRequest from "@/Page/DonationRequest/DonationRequest";
import Funding from "@/Page/Funding/Funding";
import Home from "@/Page/Home/Home";

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
        path: "donation-requests",
        element: (
          <PrivetRoute>
            <DonationRequest />
          </PrivetRoute>
        ),
      },
      {
        path: "funding",
        element: (
          <PrivetRoute>
            <Funding />
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
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: WelcomePage,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "CreateDonationRequest",
        Component: CreateDonationRequest,
      },
    ],
  },
]);

export default router;
