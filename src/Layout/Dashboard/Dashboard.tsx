import { Link, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaUserFriends,
  FaPlus,
  FaList,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaUserCircle,
  FaUserInjured,
} from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import Container from "@/Page/Shared/Responsive/Container";
import SidebarLink from "./Shared/SidebarLink/SidebarLink";
import useAuth from "@/Hook/useAuth/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, logOutUser } = useAuth();

  // const handleLogout = () => {
  //   logOutUser();
  // };

  const getSidebarLinks = () => {
    const commonLinks = [
      { to: "/", label: "Home", icon: GoHome },
      {
        to: "/dashboard/CreateDonationRequest",
        label: "Profile",
        icon: FaUserInjured,
      },
    ];

    if (user?.role === "admin") {
      return [
        ...commonLinks,
        { to: "/dashboard/all-users", label: "All Users", icon: FaUserFriends },
        {
          to: "/dashboard/all-blood-donation-request",
          label: "All Requests",
          icon: FaList,
        },
        { to: "/dashboard/funding", label: "Funding", icon: FaMoneyBillWave },
      ];
    } else if (user?.role === "donor") {
      return [
        ...commonLinks,
        {
          to: "/dashboard/my-donation-requests",
          label: "My Requests",
          icon: FaList,
        },
        {
          to: "/dashboard/create-donation-request",
          label: "Create Request",
          icon: FaPlus,
        },
      ];
    } else if (user?.role === "volunteer") {
      return [
        ...commonLinks,
        {
          to: "/dashboard/all-blood-donation-request",
          label: "All Requests",
          icon: FaList,
        },
      ];
    }
    return commonLinks;
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <Container>
      <div className="drawer lg:drawer-open bg-background min-h-screen">
        <Input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* ------------- main dashboard content ------------- */}
        <div className="drawer-content flex flex-col">
          {/* ---------- NAVBAR ---------- */}

          <div className="flex items-center gap-2 py-3 lg:hidden bg-background/95 backdrop-blur-sm sticky top-0 z-1 shadow-sm border-b border-border">
            {/* Drawer Toggle for mobile */}
            <label
              htmlFor="my-drawer-4"
              className="flex items-center justify-center cursor-pointer  ">
              <FaBarsStaggered size={21} className="text-foreground" />
            </label>
          </div>

          <div className="flex items-center gap-3"></div>

          {/* ---------- page outlet ---------- */}
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </div>

        {/* ------------- sidebar ------------- */}
        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="flex flex-col bg-sidebar min-h-full is-drawer-close:w-16 is-drawer-open:w-64 border-r border-sidebar-border duration-300">
            {/* User Profile Section */}
            <div className="p-4 border-b border-sidebar-border">
              <label
                htmlFor="my-drawer-4"
                className="flex items-center justify-end cursor-pointer  ">
                <FaBarsStaggered size={21} className="text-foreground" />
              </label>
            </div>

            {/* Sidebar Menu */}
            <ul className="menu w-full p-2 py-4 gap-1 grow">
              {sidebarLinks.map((link, index) => (
                <SidebarLink
                  key={index}
                  to={link.to}
                  dataTip={link.label}
                  span={link.label}
                  Icon={link.icon}
                />
              ))}
            </ul>

            {/* Sidebar Footer */}
            <div className="p-2 border-t border-sidebar-border flex items-center is-drawer-close:flex-col is-drawer-open:flex-row  gap-2">
              {/* Collapsed state avatar */}
              <Link to={"/dashboard/profile"} className="  justify-center">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-sidebar-primary"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                    <FaUserCircle size={16} />
                  </div>
                )}
              </Link>
              <Button variant={"outline"}>
                <FaSignOutAlt />
                <span className="is-drawer-close:hidden ">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
