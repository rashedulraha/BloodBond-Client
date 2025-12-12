import useAuth from "@/Hook/useAuth";
import Banner from "../Shared/Banner/Banner";
import ContactUs from "../Shared/ContactUs/ContactUs";
import Features from "../Shared/Feature/Feature";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import Container from "../Shared/Responsive/Container";
import LoadingSpinner from "../Shared/Spinner/LoadingSpinner";
// import { HashLoader } from "react-spinners";

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <Container>
        <Banner />
        <Features />
        <HowItWorks />
        <ContactUs />
      </Container>
    </div>
  );
};

export default Home;
