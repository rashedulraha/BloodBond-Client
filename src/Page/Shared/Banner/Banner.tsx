import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaSearch } from "react-icons/fa";
import Container from "../Responsive/Container";

const Banner = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-background">
      <Container>
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <span className="absolute w-40 h-40 rounded-full bg-(--primary)/30 top-10 left-10 animate-spin-slow"></span>
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
            <Link
              to="/register"
              className="btn bg-primary text-primary-foreground px-10 py-4 rounded-full flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105">
              <FaHandHoldingHeart className="text-xl" />
              Join as a Donor
            </Link>

            <Link
              to="/search"
              className="btn border-2 border-primary text-primary px-10 py-4 rounded-full flex items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1 hover:scale-105">
              <FaSearch className="text-xl" />
              Search Donors
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
