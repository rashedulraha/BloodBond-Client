import MainLayouts from "@/Layout/MainLayouts/MainLayouts";
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
]);

export default router;
