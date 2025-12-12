import React from "react";
import { Link } from "react-router-dom";
import { Search, Zap, Users } from "lucide-react";

interface CtaButtonProps {
  to: string;
  label: string;
  Icon: React.ElementType;
  variant: "primary" | "secondary";
}

const CtaButton: React.FC<CtaButtonProps> = ({ to, label, Icon, variant }) => {
  const isPrimary = variant === "primary";
  const baseClasses =
    "btn btn-md shadow-xl font-bold transition-all duration-300 transform hover:scale-[1.05] flex items-center justify-center min-w-[220px]";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${
        isPrimary
          ? "btn-primary bg-primary text-primary-foreground border-0 hover:bg-primary/90 "
          : "bg-secondary text-primary border-secondary/50 hover:bg-secondary/80"
      }`}>
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );
};

const VideoLikeHeroBanner: React.FC = () => {
  return (
    <div className="mx-auto px-4 text-center max-w-7xl">
      <div
        className="inline-flex items-center text-sm uppercase tracking-widest font-semibold mb-6 p-2 px-4 rounded-full bg-destructive/10 text-destructive border border-destructive/50"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-delay="100">
        <Zap className="w-4 h-4 mr-2 truncate" /> Join the Lifesaver Community.
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold  leading-tight md:leading-tighter mb-4 md:mb-6">
        <span className="block">
          Every Drop{" "}
          <span className="relative">
            <span className="bg-linear-to-r bg-primary bg-clip-text text-transparent">
              Counts
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r bg-chart-3 rounded-full" />
          </span>
        </span>
        <span className="block mt-2 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          In Saving <span className="text-chart-3">Lives</span>
        </span>
      </h1>

      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 mb-6 md:mb-8 max-w-3xl lg:max-w-4xl mx-auto px-4">
        Instant connection between blood donors and recipients across
        Bangladesh's 64 districts
      </h2>

      <div
        className="flex flex-col md:flex-row sm:flex-row gap-5 justify-center"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="700">
        {/* Primary CTA: Find Requests */}
        <CtaButton
          to="/find-blood-input"
          label="Search Blood Now"
          Icon={Search}
          variant="primary"
        />

        {/* Secondary CTA: Register */}
        <CtaButton
          to="/volunteer-register"
          label="Volunteer/Register"
          Icon={Users}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default VideoLikeHeroBanner;
