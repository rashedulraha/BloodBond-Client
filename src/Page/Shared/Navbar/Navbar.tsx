import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHandHoldingHeart,
  FaMoneyBillWave,
  FaUserCircle,
} from "react-icons/fa";
import Container from "../Responsive/Container";
import { useState } from "react";
// import useAuth from "@/Hook/useAuth/useAuth";
import { ModeToggle } from "@/components/mode-toggle";
import useAuth from "@/Hook/useAuth/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logOutUser } = useAuth();

  const handleUserLogout = () => {
    logOutUser();
  };

  // Public Links
  const publicLinks = (
    <>
      <Link
        to="/donation-requests"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaHandHoldingHeart /> Donation Requests
      </Link>
    </>
  );

  // Private Links
  const privateLinks = (
    <>
      <Link
        to="/donation-requests"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaHandHoldingHeart /> Donation Requests
      </Link>
      <Link
        to="/funding"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaMoneyBillWave /> Funding
      </Link>
    </>
  );

  return (
    <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="items-center gap-2 flex ">
            <Link to="/" className="text-2xl font-bold hidden md:flex">
              Blood <span className="text-primary">Bond</span>
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2  cursor-pointer">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
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
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <FaUserCircle />
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
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center px-3 py-2 rounded-sm bg-primary/10 hover:bg-primary border border-primary  hover:text-primary-foreground transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleUserLogout}
                      className="w-full px-3 py-2 rounded-sm bg-primary hover:text-destructive-foreground transition-colors text-center">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 border-t border-border pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/donation-requests"
                  className="flex items-center gap-2 py-2">
                  <FaHandHoldingHeart /> Donation Requests
                </Link>
                <Link to="/funding" className="flex items-center gap-2 py-2">
                  <FaMoneyBillWave /> Funding
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 py-2">
                  Dashboard
                </Link>
                <button
                  onClick={handleUserLogout}
                  className="text-destructive py-2 text-left bg-primary/10 border border-primary rounded-sm mb-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/donation-requests"
                  className="flex items-center gap-2 py-2">
                  <FaHandHoldingHeart /> Donation Requests
                </Link>
                <Link to="/login" className="flex items-center  gap-2 py-2">
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
