import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import Container from "../Responsive/Container";

import { useState } from "react";
import useAuth from "@/Hook/useAuth/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();

  const handleUserLogout = () => {
    logOutUser();
  };

  const loginUser = (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button">
          {user && (
            <div className="md:tooltip md:tooltip-bottom flex items-center justify-center">
              <img
                className="-full border hover:bg-primary hover:text-white transition-all w-8  h-8  cursor-pointer rounded-full"
                alt="user Image"
              />
            </div>
          )}
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-9999 mt-5 md:mt-4 w-60 p-3 border border-base-300 space-y-3">
          {/* <LinkMenu to={"user-profile"} label={"profile"} />
          <LinkMenu to={"my-request"} label={"My Requests"} />
          <LinkMenu to={"my-listings"} label={"My Listings"} />
          <LinkMenu to={"add-food"} label={"Add Food"} /> */}

          <button
            onClick={handleUserLogout}
            className=" px-3 py-2 btn-primary rounded-full bg-primary shadow-none cursor-pointer">
            Logout
          </button>
        </ul>
      </div>
    </>
  );

  const MenuLink = (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8 font-medium ">
        {/* <Menu to={""} label={"Home"} />
        <Menu to={"about"} label={"About"} />
        
        <Menu to={"available-foods"} label={"Available Foods"} /> */}
        <Link to={"profile"}>Profile</Link>
      </div>
    </>
  );

  return (
    <div className="bg-base-100/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <Container>
        <div className="navbar">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className=" cursor-pointer lg:hidden p-2  "
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-9999 mt-3 w-64 p-4 shadow-xl border border-base-300">
                {MenuLink}
              </ul>
            </div>

            <Link to="/" className="flex items-center gap-1 ml-2 md:ml-0 ">
              <span className="text-2xl font-bold hidden sm:block">
                Blood <span className="text-primary">bond</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{MenuLink}</ul>
          </div>

          {/* Right Side: Theme + User/ */}
          <div className="navbar-end flex items-center gap-5">
            {/* Theme toggle */}
            {/* <ThemeToggle /> */}
            {user ? (
              <div className="flex items-center gap-5">
                <div className="items-center justify-center ">{loginUser}</div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary rounded-full px-6 shadow-none border-none hover:shadow-lg transition-all">
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
