import React from "react";
import { Link } from "react-router-dom";
import { Search, Zap, Droplet, Users, MapPin, Calendar } from "lucide-react";
import Container from "../Responsive/Container";

// --- [ Shared CTA Button Component ] ---
interface CtaButtonProps {
  to: string;
  label: string;
  Icon: React.ElementType;
  variant: "primary" | "secondary";
}

const CtaButton: React.FC<CtaButtonProps> = ({ to, label, Icon, variant }) => {
  const isPrimary = variant === "primary";
  const baseClasses =
    "btn btn-lg shadow-xl font-bold transition-all duration-300 transform hover:scale-[1.05] flex items-center justify-center min-w-[220px]";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${
        isPrimary
          ? "btn-primary bg-primary text-primary-foreground border-0 hover:bg-primary/90"
          : "bg-secondary text-primary border-secondary/50 hover:bg-secondary/80"
      }`}>
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );
};

// --- [ Enhanced Stat Component ] ---
interface StatProps {
  value: string;
  label: string;
  Icon: React.ElementType;
  delay: number;
}

const EnhancedStat: React.FC<StatProps> = ({ value, label, Icon, delay }) => (
  <div
    className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-sm rounded-md border border-primary/20 shadow-2xl"
    data-aos="fade-up" // AOS Animation
    data-aos-delay={delay}
    data-aos-duration="800">
    <Icon className="w-8 h-8 text-destructive mb-3" />
    <p className="text-4xl font-extrabold text-foreground">{value}</p>
    <p className="text-sm font-medium text-muted-foreground mt-1 text-center">
      {label}
    </p>
  </div>
);

const HeroBanner: React.FC = () => {
  return (
    <section className="relative pt-32 pb-40 overflow-hidden bg-background">
      {/* --- [ Unique Background: Plasma Gradient and Heartbeat Pulse ] --- */}
      <div className="absolute inset-0 opacity-10 dark:opacity-8">
        {/* Animated Red Pulse (Simulating Heartbeat/Urgency) */}
        <div className="absolute w-[800px] h-[800px] bg-primary/20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary/50 opacity-0 animate-pulse-slow"></div>
      </div>

      <Container>
        <div className="mx-auto relative z-10 px-4 text-center max-w-7xl">
          {/* --- [ Top Tagline (AOS) ] --- */}
          <div
            className="inline-flex items-center text-sm uppercase tracking-widest font-semibold mb-6 p-2 px-4 rounded-full bg-destructive/10 text-destructive border border-destructive/50"
            data-aos="fade-down"
            data-aos-duration="600">
            <Zap className="w-4 h-4 mr-2" /> Be the lifeline. Donate today.
          </div>

          {/* --- [ Main Headline (AOS) ] --- */}
          <h1
            className="text-5xl md:text-7xl font-extrabold text-foreground leading-snug mb-4"
            data-aos="fade-up"
            data-aos-delay="200">
            The Fastest Way to <span className="text-destructive">Connect</span>
            . The Easiest Way to <span className="text-primary">Save</span>.
          </h1>

          {/* --- [ Subtitle (AOS) ] --- */}
          <h2
            className="text-lg md:text-2xl font-medium text-muted-foreground mb-12 max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300">
            Seamlessly connect urgent patient needs with verified donors across
            all districts.
          </h2>

          {/* --- [ Action Buttons (AOS) ] --- */}
          <div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
            data-aos="fade-up"
            data-aos-delay="400">
            {/* Primary CTA: Find Requests */}
            <CtaButton
              to="/search-requests"
              label="Search Blood Now"
              Icon={Search}
              variant="primary"
            />

            {/* Secondary CTA: Register */}
            <CtaButton
              to="/register"
              label="Volunteer/Register"
              Icon={Users}
              variant="secondary"
            />
          </div>

          {/* --- [ Detailed Impact Statistics (AOS) ] --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <EnhancedStat
              Icon={Droplet}
              value="3 Minutes"
              label="Average Donor Match Time"
              delay={600}
            />
            <EnhancedStat
              Icon={MapPin}
              value="64"
              label="Districts Covered Nationally"
              delay={700}
            />
            <EnhancedStat
              Icon={Calendar}
              value="99%"
              label="Successful Completion Rate"
              delay={800}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroBanner;
