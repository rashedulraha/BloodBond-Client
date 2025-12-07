import Banner from "../Shared/Banner/Banner";
import ContactUs from "../Shared/ContactUs/ContactUs";
import Features from "../Shared/Feature/Feature";
import Container from "../Shared/Responsive/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
        <Features />
        <ContactUs />
      </Container>
    </div>
  );
};

export default Home;
