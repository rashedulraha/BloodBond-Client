import Footer from "@/Page/Shared/Footer/Footer";
import HelpDesk from "@/Page/Shared/HelpDesk/HelpDesk";
import Navbar from "@/Page/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 my-5 md:py-10">
        <Outlet />
      </div>
      <Footer />
      <HelpDesk />
    </div>
  );
};

export default MainLayouts;
