import Banner from "../Shared/Banner/Banner";
import Features from "../Shared/Feature/Feature";
import Container from "../Shared/Responsive/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
        <Features />
      </Container>
    </div>
  );
};

export default Home;
