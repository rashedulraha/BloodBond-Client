import { Link } from "react-router-dom";
import Container from "../Responsive/Container";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import useAuth from "@/Hook/useAuth/useAuth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();

  const handleUserLogout = () => {
    logOutUser();
  };

  // Public Links (Icons removed)
  const publicLinks = (
    <>
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link
        to="/donation-requests"
        className="hover:text-primary transition-colors">
        Donation Requests
      </Link>
    </>
  );

  // Private Links (Icons removed)
  const privateLinks = (
    <>
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link
        to="/donation-requests"
        className="hover:text-primary transition-colors">
        Donation Requests
      </Link>
      <Link to="/funding" className="hover:text-primary transition-colors">
        Funding
      </Link>
    </>
  );

  return (
    <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="items-center gap-2 flex">
            <Link to="/" className="text-2xl font-bold">
              Blood <span className="text-primary">Bond</span>
            </Link>

            {/* Mobile Menu Button - Using basic symbols */}
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 cursor-pointer text-2xl font-bold">
                {isOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {/* Center Nav Links */}
          <div className="hidden lg:flex gap-6 font-medium">
            {user ? privateLinks : publicLinks}
          </div>

          {/* Right Side: Mode Toggle + Avatar */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {user ? (
              ""
            ) : (
              <Link
                to="/login"
                className="btn bg-primary/30 rounded-full px-6 shadow-none border-none hover:shadow-lg transition-all">
                Login
              </Link>
            )}

            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-card rounded-box z-50 mt-3 w-56 p-3 border border-border space-y-2 shadow-lg">
                  <li className="font-semibold text-center">{user.name}</li>
                  <li className="text-center text-muted-foreground text-sm">
                    {user.email}
                  </li>
                  <li className="text-center text-muted-foreground text-sm">
                    Role: {user.role}
                  </li>
                  <div className="divider my-1"></div>

                  <Link to="/dashboard">
                    <Button
                      variant={"outline"}
                      className="w-full rounded cursor-pointer">
                      Dashboard
                    </Button>
                  </Link>

                  <Button onClick={handleUserLogout} className="w-full">
                    Logout
                  </Button>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 border-t border-border pt-2 flex flex-col gap-2 pb-5">
            {user ? (
              <>
                <Link
                  to="/"
                  className="py-2 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link
                  to="/donation-requests"
                  className="py-2 hover:text-primary transition-colors">
                  Donation Requests
                </Link>
                <Link
                  to="/funding"
                  className="py-2 hover:text-primary transition-colors">
                  Funding
                </Link>
                <Link
                  to="/dashboard"
                  className="py-2 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <button className="text-destructive w-fit py-2 px-4 text-left font-semibold">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="py-2 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link
                  to="/donation-requests"
                  className="py-2 hover:text-primary transition-colors">
                  Donation Requests
                </Link>
                <Link
                  to="/login"
                  className="py-2 hover:text-primary transition-colors">
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
