import React from "react";
import { Link } from "react-router-dom";
// Updated Icons for a strong impact
import { HeartPulse, Droplet, TrendingUp } from "lucide-react";
import useAuth from "@/Hook/useAuth";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

const VideoLikeHeroBanner: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="text-center container mx-auto ">
      {/* 1. Enhanced Tagline/Pre-Header (Focus on Urgency and Trust) */}
      <div
        className="inline-flex items-center text-[10px] uppercase tracking-widest font-semibold mb-6 p-2 px-4 rounded-full bg-destructive/10 text-destructive border border-destructive/50 truncate"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-delay="100">
        <HeartPulse className="w-4 h-4 mr-2 " />
        {/* Updated Text */}
        Connecting Hearts, Saving Futures.
      </div>

      {/* 2. Powerful Main Headline (Focus on Action and Impact) */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold leading-tight md:leading-tighter mb-4 md:mb-6">
        <span className="block">
          Connect{" "}
          <span className="relative">
            <span className="bg-linear-to-r bg-primary bg-clip-text text-transparent">
              Instantly.
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r bg-chart-3 rounded-full" />
          </span>
        </span>
        <span className="block mt-2 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-chart-3">Save</span> A Life Today
        </span>
      </h1>

      {/* 3. Detailed Sub-headline (Focus on scope and solution) */}
      <h2 className="text-md sm:text-lg md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-4xl lg:max-w-5xl mx-auto px-4">
        We bridge the critical gap between urgent patient needs and verified
        donors, making emergency blood access simple and fast across all
        regions.
      </h2>

      <div
        className="flex flex-col md:flex-row sm:flex-row gap-5 justify-center mb-10"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="700">
        {/* Primary CTA: Find Blood Requests (Urgency) */}
        <Link to={"/search-page"}>
          <Button>
            <FaSearch />
            Search Donors
          </Button>
        </Link>

        {/* Secondary CTA: Register as Donor (Community Building) */}
        {user ? (
          <>
            <Link to={"/volunteer"}>
              <Button variant={"outline"}>
                <Droplet /> Join as a Volunteer
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/register"}>
              <Button variant={"outline"}>
                <Droplet /> Join as a donor
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* New Section: Social Impact/Key Metric (for credibility) */}
      <div className="flex justify-center mt-6">
        <div
          className="inline-flex items-center space-x-2 text-sm md:text-base font-semibold text-secondary-foreground/70"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="900">
          <TrendingUp className="w-5 h-5 text-chart-3" />
          <span className="text-xl font-extrabold text-chart-3 mr-1">
            3,500+
          </span>
          <span className="uppercase tracking-wide">
            Lives Impacted Last Month
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoLikeHeroBanner;
