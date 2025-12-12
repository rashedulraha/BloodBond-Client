import useAuth from "@/Hook/useAuth";
import ContactUs from "../Shared/ContactUs/ContactUs";
import Features from "../Shared/Feature/Feature";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import Container from "../Shared/Responsive/Container";
import LoadingSpinner from "../Shared/Spinner/LoadingSpinner";
import AnimatedBackground from "@/components/AnimatedBackground/AnimatedBackground";
import VideoLikeHeroBanner from "@/components/VideoLikeHeroBanner/VideoLikeHeroBanner";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Hero Banner Section */}
      <AnimatedBackground>
        <Container>
          <VideoLikeHeroBanner />
        </Container>
      </AnimatedBackground>

      {/* Other Sections */}
      <Container>
        <Features />
        <HowItWorks />
        <ContactUs />
      </Container>
    </div>
  );
};

export default Home;
