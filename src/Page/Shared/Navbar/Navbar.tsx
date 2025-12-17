import { Link } from "react-router-dom";
import Container from "../Responsive/Container";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import useAuth from "@/Hook/useAuth";
import useRole from "@/Hook/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hook/useAxiosSecure";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const { role, status } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: profileInfo = [] } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email not available for role query.");
      }
      const result = await axiosSecure.get(`/profile/${user.email}/data`);
      return result.data;
    },
  });

  const userData = profileInfo[0];

  const handleUserLogout = () => {
    logOutUser();
  };

  // Public Links (Icons removed)
  const publicLinks = (
    <>
      <Link to="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/about" className="hover:text-primary transition-colors">
        About
      </Link>
      <Link to="/blog" className="hover:text-primary transition-colors">
        Blog
      </Link>
      <Link to="/contact" className="hover:text-primary transition-colors">
        Contact Us
      </Link>
    </>
  );

  // Private Links (Icons removed)
  const privateLinks = (
    <>
      <Link to="/funding" className="hover:text-primary transition-colors">
        Funding
      </Link>
      <Link to="/dashboard/donation-requests" className="lg:hidden">
        <Button>Donation request</Button>
      </Link>
    </>
  );

  return (
    <div className=" backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-border">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className=" items-center gap-2 flex flex-1">
            <Link to="/" className="text-2xl font-bold hidden lg:flex">
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
          <div className="hidden lg:flex gap-6 font-medium flex-1">
            {/* {user ? privateLinks : publicLinks} */}
            {publicLinks} {user && privateLinks}
          </div>

          {/* Right Side: Mode Toggle + Avatar */}
          <div className="flex items-center gap-4 flex-2 md:flex-1 justify-end">
            {!user && (
              <Link to="/login">
                <Button className="cursor-pointer">Login</Button>
              </Link>
            )}

            {user && (
              <Link to="/dashboard/donation-requests">
                <Button className="cursor-pointer hidden lg:flex">
                  Donation Requests
                </Button>
              </Link>
            )}

            {user && (
              <div className="dropdown dropdown-end">
                <Label tabIndex={0} className="cursor-pointer">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </Label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-card rounded-box z-50 mt-3 w-56 p-3 border border-border space-y-2 shadow-lg ">
                  <li className="font-semibold text-center">
                    {user.displayName}
                  </li>
                  <ul>
                    <li className="text-center text-muted-foreground text-sm flex items-center justify-center flex-row capitalize">
                      Role: <span className="text-green-500">{role}</span>
                    </li>
                    <li className="text-center text-muted-foreground text-sm flex items-center justify-center flex-row capitalize">
                      Status:{" "}
                      <span
                        className={
                          status === "block" ? "text-red-500" : "text-green-500"
                        }>
                        {status || "active"}
                      </span>
                    </li>
                  </ul>
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
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border pt-2 flex flex-col z-5 absolute left-0 w-full backdrop-blur-3xl px-4 bg-background/90 gap-2 pb-5  ">
            {publicLinks} {user && privateLinks}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
