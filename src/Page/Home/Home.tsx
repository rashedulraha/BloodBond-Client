import useAuth from "@/Hook/useAuth";
import ContactUs from "../Shared/ContactUs/ContactUs";
import Features from "../Shared/Feature/Feature";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import Container from "../Shared/Responsive/Container";
import LoadingSpinner from "../Shared/Spinner/LoadingSpinner";
import VideoLikeHeroBanner from "@/components/VideoLikeHeroBanner/VideoLikeHeroBanner";
import OurVolunteers from "../Shared/OurVolunteers/OurVolunteers";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <AnimatedBackground>
        <VideoLikeHeroBanner />
      </AnimatedBackground>

      <div className="bg-card mt-5 md:mt-10 ">
        <Features />
        <OurVolunteers />
        <Container>
          <HowItWorks />
          <ContactUs />
        </Container>
      </div>
    </div>
  );
};

export default Home;
