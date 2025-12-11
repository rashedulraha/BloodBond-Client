import Container from "../Responsive/Container";
import BannerLink from "./Shared/BannerLink";

import { FaHandHoldingHeart, FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <Container>
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <span className="absolute w-40 h-40 rounded-full bg-primary/30 top-10 left-10 animate-spin-slow"></span>
          <span className="absolute w-60 h-60 rounded-full bg-(--secondary)/20 top-1/3 right-10 animate-ping-slow"></span>
          <span className="absolute w-32 h-32 rounded-full bg-(--accent)/25 bottom-10 left-1/4 animate-bounce-slow"></span>
          <span className="absolute w-48 h-48 rounded-full bg-primary/20 bottom-20 right-1/3 animate-spin-slow"></span>
        </div>

        <div className="container mx-auto relative z-10 px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6">
            Save Lives Through{" "}
            <span className="text-primary">Blood Donation</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join a caring community of donors and help those in urgent need.
            Your blood donation can save up to three lives every time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <BannerLink
              to="register"
              span="Join as a Donor"
              Icon={FaHandHoldingHeart}
              className="bg-primary text-foreground"
            />
            <BannerLink
              to="search"
              span="Search Donors"
              Icon={FaSearch}
              className="text-primary bg-foreground"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
