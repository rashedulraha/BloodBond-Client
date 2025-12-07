import { ModeToggle } from "@/components/mode-toggle";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="bg-primary/10 backdrop-blur-3xl text-primary-foreground flex items-center justify-between px-8 py-3 shadow-md sticky top-0 z-9999 ">
        <Link to={"/"} className="text-xl font-bold ">
          Bloodbond
        </Link>
        <div>
          <ModeToggle />
        </div>
      </nav>

      <main className="flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
