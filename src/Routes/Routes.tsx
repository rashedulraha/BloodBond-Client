import AuthLayout from "@/Layout/Auth/AuthLayout";
import Dashboard from "@/Layout/Dashboard/Dashboard";
import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
import About from "@/Page/About/About";
import LoginPage from "@/Page/Auth/Login/Login";
import RegisterPage from "@/Page/Auth/Register/RegisterPage";
import Blog from "@/Page/Blog/Blog";
import Contact from "@/Page/Contact/Contact";
import AllDonationRequest from "@/Page/Dashboard/AllDonationRequest/AllDonationRequest";
import AllRegisterUser from "@/Page/Dashboard/AllRegisterUser/AllRegisterUser";
import AllVolunteerRequest from "@/Page/Dashboard/AllVolunteerRequest/AllVolunteerRequest";
import MyDonationRequests from "@/Page/Dashboard/MyDonationRequests/MyDonationRequests";
import Profile from "@/Page/Dashboard/Profile/Profile";

import WelcomePage from "@/Page/Dashboard/WelcomePage/WelcomePage";
import DonationRequest from "@/Page/DonationRequest/DonationRequest";

import FindBloodInput from "@/Page/FindBloodInput/FindBloodInput";
import DonationRequestDetails from "@/Page/FindBloodInput/Shared/DonationRequestDetails/DonationRequestDetails";
import Funding from "@/Page/Funding/Funding";
import Home from "@/Page/Home/Home";

import PrivetRoute from "@/Page/Shared/PrivetRoute/PrivetRoute";
import Volunteer from "@/Page/Volunteer/Volunteer";

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
        path: "search-page",
        Component: FindBloodInput,
      },
      {
        path: "donation-request-details/:id",
        element: (
          <PrivetRoute>
            <DonationRequestDetails />
          </PrivetRoute>
        ),
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
        path: "funding",
        element: (
          <PrivetRoute>
            <Funding />
          </PrivetRoute>
        ),
      },
      {
        path: "volunteer",
        element: (
          <PrivetRoute>
            <Volunteer />
          </PrivetRoute>
        ),
      },
    ],
  },

  //!  auth route
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

  //!  dashboard route
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
        path: "donation-requests",
        Component: DonationRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "all-register-user",
        Component: AllRegisterUser,
      },
      {
        path: "all-blood-donation-request",
        Component: AllDonationRequest,
      },
      {
        path: "all-volunteer-request",
        Component: AllVolunteerRequest,
      },
    ],
  },
]);

export default router;
