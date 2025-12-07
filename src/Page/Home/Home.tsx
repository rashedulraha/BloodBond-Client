import Banner from "../Shared/Banner/Banner";
import ContactUs from "../Shared/ContactUs/ContactUs";
import Features from "../Shared/Feature/Feature";
import HowItWorks from "../Shared/HowItWorks/HowItWorks";
import Container from "../Shared/Responsive/Container";

const Home = () => {
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
