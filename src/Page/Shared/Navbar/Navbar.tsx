import { ModeToggle } from "@/components/mode-toggle";
import Container from "../Responsive/Container";

const Navbar = () => {
  return (
    <div>
      <Container>
        <ModeToggle />
        <h1>Hello world</h1>
      </Container>
    </div>
  );
};

export default Navbar;
