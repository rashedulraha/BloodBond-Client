import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import Footer from "@/Page/Shared/Footer/Footer";
import HelpDesk from "@/Page/Shared/HelpDesk/HelpDesk";
import Navbar from "@/Page/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <AnimatedBackground>
        <div className="flex-1">
          <Outlet />
        </div>
      </AnimatedBackground>
      <Footer />
      <HelpDesk />
    </div>
  );
};

export default MainLayouts;
