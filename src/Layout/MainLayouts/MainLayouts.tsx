import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import Footer from "@/Page/Shared/Footer/Footer";
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
    </div>
  );
};

export default MainLayouts;
