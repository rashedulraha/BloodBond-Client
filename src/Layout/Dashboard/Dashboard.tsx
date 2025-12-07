import { Link, Outlet } from "react-router-dom";
import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaUserFriends,
  FaPlus,
  FaList,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import Container from "@/Page/Shared/Responsive/Container";
import SidebarLink from "./Shared/SidebarLink/SidebarLink";
import useAuth from "@/Hook/useAuth/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getSidebarLinks = () => {
    const commonLinks = [
      { to: "/", label: "Home", icon: GoHome },
      { to: "/dashboard/profile", label: "Profile", icon: IoSettingsOutline },
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
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* ------------- main dashboard content ------------- */}
        <div className="drawer-content flex flex-col">
          {/* ---------- NAVBAR ---------- */}
          <nav className="navbar flex items-center justify-between w-full bg-card shadow-sm px-4 lg:px-6 border-b border-border">
            <div className="flex items-center gap-2">
              {/* Drawer Toggle for mobile */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost shadow-none">
                <GoSidebarExpand size={21} className="text-foreground" />
              </label>

              <h1 className="text-primary font-bold text-lg">
                <Link to={"/"}>Blood Bond</Link>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <ModeToggle />
            </div>
          </nav>

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
              <div className="flex flex-col items-center text-center is-drawer-close:hidden">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-sidebar-primary mb-3"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center mb-3">
                    <FaUserCircle size={32} />
                  </div>
                )}
                <h3 className="font-semibold text-sidebar-foreground">
                  {user?.name}
                </h3>
                <p className="text-sm text-sidebar-accent-foreground">
                  {user?.email}
                </p>
                <span className="mt-1 px-2 py-1 bg-sidebar-accent text-sidebar-accent-foreground text-xs rounded-full">
                  {user?.role}
                </span>
              </div>

              {/* Collapsed state avatar */}
              <div className="is-drawer-close:flex is-drawer-open:hidden justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-sidebar-primary"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center">
                    <FaUserCircle size={16} />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Menu */}
            <ul className="menu w-full p-2 py-4 gap-1 flex-grow">
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
            <div className="p-2 border-t border-sidebar-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors">
                <FaSignOutAlt />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
