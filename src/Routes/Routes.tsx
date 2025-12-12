import AuthLayout from "@/Layout/Auth/AuthLayout";
import Dashboard from "@/Layout/Dashboard/Dashboard";
import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
import About from "@/Page/About/About";
import LoginPage from "@/Page/Auth/Login/Login";
import RegisterPage from "@/Page/Auth/Register/RegisterPage";
import Blog from "@/Page/Blog/Blog";
import Contact from "@/Page/Contact/Contact";
import CreateDonationRequest from "@/Page/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "@/Page/Dashboard/MyDonationRequests/MyDonationRequests";
import Profile from "@/Page/Dashboard/Profile/Profile";

import WelcomePage from "@/Page/Dashboard/WelcomePage/WelcomePage";
import DonationRequest from "@/Page/DonationRequest/DonationRequest";
import FindBloodInput from "@/Page/FindBloodInput/FindBloodInput";
import Funding from "@/Page/Funding/Funding";
import Home from "@/Page/Home/Home";

import PrivetRoute from "@/Page/Shared/PrivetRoute/PrivetRoute";
import VolunteerRegister from "@/Page/VolunteerRegister/VolunteerRegister";
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
        path: "about",
        Component: About,
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "find-blood-input",
        Component: FindBloodInput,
      },
      {
        path: "volunteer-register",
        element: (
          <PrivetRoute>
            <VolunteerRegister />
          </PrivetRoute>
        ),
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
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
    ],
  },
]);

export default router;
