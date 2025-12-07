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
import useAuth from "@/Hook/useAuth/useAuth";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();

  const handleUserLogout = () => {
    logOutUser();
  };

  // Public links (shown when not logged in)
  const publicLinks = (
    <>
      <Link
        to="/donation-requests"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaHandHoldingHeart />
        <span>Donation Requests</span>
      </Link>
      <Link
        to="/login"
        className="btn btn-primary rounded-full px-6 shadow-none border-none hover:shadow-lg transition-all">
        Login
      </Link>
    </>
  );

  // Private links (shown when logged in)
  const privateLinks = (
    <>
      <Link
        to="/donation-requests"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaHandHoldingHeart />
        <span>Donation Requests</span>
      </Link>
      <Link
        to="/funding"
        className="flex items-center gap-2 hover:text-primary transition-colors">
        <FaMoneyBillWave />
        <span>Funding</span>
      </Link>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="cursor-pointer">
          {user ? (
            <div className="md:tooltip md:tooltip-bottom flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer"
                  alt="User"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <FaUserCircle />
                </div>
              )}
            </div>
          ) : null}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-card rounded-box z-50 mt-3 w-60 p-3 border border-border space-y-3 shadow-lg">
          <li className="font-semibold text-center text-foreground">
            {user?.name}
          </li>
          <li className="text-center text-muted-foreground text-sm">
            {user?.email}
          </li>
          <li className="text-center text-muted-foreground text-sm">
            Role: {user?.role}
          </li>
          <div className="divider my-1"></div>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 text-center rounded-lg bg-primary/10 border border-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <button
              onClick={handleUserLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  // Mobile menu links
  const mobileMenuLinks = user ? (
    <>
      <Link to="/donation-requests" className="flex items-center gap-2 py-2">
        <FaHandHoldingHeart />
        <span>Donation Requests</span>
      </Link>
      <Link to="/funding" className="flex items-center gap-2 py-2">
        <FaMoneyBillWave />
        <span>Funding</span>
      </Link>
      <Link to="/dashboard" className="flex items-center gap-2 py-2">
        Dashboard
      </Link>
      <button
        onClick={handleUserLogout}
        className="flex items-center gap-2 py-2 text-destructive">
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/donation-requests" className="flex items-center gap-2 py-2">
        <FaHandHoldingHeart />
        <span>Donation Requests</span>
      </Link>
      <Link to="/login" className="flex items-center gap-2 py-2">
        Login
      </Link>
    </>
  );

  return (
    <div className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-border">
      <Container>
        <div className="navbar">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="cursor-pointer lg:hidden p-2"
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-card rounded-box z-50 mt-3 w-64 p-4 shadow-xl border border-border">
                {mobileMenuLinks}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-1 ml-2 md:ml-0">
              <span className="text-2xl font-bold hidden sm:block">
                Blood <span className="text-primary">Bond</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <div className="flex items-center gap-6 font-medium">
              {user ? privateLinks : publicLinks}
            </div>
          </div>

          {/* Right Side: Theme Toggle */}
          <div className="navbar-end flex items-center gap-5">
            <ModeToggle />
            {/* Mobile user menu */}
            {user && (
              <div className="lg:hidden flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer"
                    alt="User"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <FaUserCircle />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
