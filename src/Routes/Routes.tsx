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
import AdminPrivetRoute from "@/Page/Shared/Admin/AdminPrivetRoute";
import BloodTypesGuide from "@/Page/Shared/Footer/Page/BloodTypesGuide/BloodTypesGuide";
import Careers from "@/Page/Shared/Footer/Page/Careers/Careers";
import DonationProcess from "@/Page/Shared/Footer/Page/DonationProcess/DonationProcess";
import DonorEligibility from "@/Page/Shared/Footer/Page/DonorEligibility/DonorEligibility";
import FAQ from "@/Page/Shared/Footer/Page/FAQ/FAQ";
import HealthTips from "@/Page/Shared/Footer/Page/HealthTips/HealthTips";
import OurMission from "@/Page/Shared/Footer/Page/OurMission/OurMission";
import Partners from "@/Page/Shared/Footer/Page/Partners/Partners";
import Report from "@/Page/Shared/Footer/Page/Report/Report";
import Research from "@/Page/Shared/Footer/Page/Research/Research";
import Team from "@/Page/Shared/Footer/Page/Team/Team";

import PrivetRoute from "@/Page/Shared/PrivetRoute/PrivetRoute";
import PrivetVolunteerRoute from "@/Page/Shared/Volunteer/PrivetVolunteerRoute";
import Volunteer from "@/Page/Volunteer/Volunteer";

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
        path: "eligibility",
        Component: DonorEligibility,
      },
      {
        path: "process",
        Component: DonationProcess,
      },
      {
        path: "blood-types",
        Component: BloodTypesGuide,
      },
      {
        path: "health-tips",
        Component: HealthTips,
      },
      {
        path: "faq",
        Component: FAQ,
      },
      {
        path: "research",
        Component: Research,
      },
      {
        path: "mission",
        Component: OurMission,
      },
      {
        path: "team",
        Component: Team,
      },
      {
        path: "partners",
        Component: Partners,
      },
      {
        path: "careers",
        Component: Careers,
      },
      {
        path: "report",
        Component: Report,
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
        element: (
          <PrivetVolunteerRoute>
            <MyDonationRequests />
          </PrivetVolunteerRoute>
        ),
      },
      {
        path: "all-register-user",
        element: (
          <AdminPrivetRoute>
            <AllRegisterUser />
          </AdminPrivetRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        Component: AllDonationRequest,
      },
      {
        path: "all-volunteer-request",
        element: (
          <AdminPrivetRoute>
            <AllVolunteerRequest />
          </AdminPrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
