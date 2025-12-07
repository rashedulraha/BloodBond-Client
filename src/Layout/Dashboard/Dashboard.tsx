import { Link, Outlet } from "react-router-dom";
import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaUserFriends,
  FaPlus,
  FaList,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { ModeToggle } from "@/components/mode-toggle";
import Container from "@/Page/Shared/Responsive/Container";
import SidebarLink from "./Shared/SidebarLink/SidebarLink";
import useAuth from "@/Hook/useAuth/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth(); // Get user info and logout function

  // Logout Handler
  const handleLogout = () => {
    logout();
  };

  // Define sidebar links based on user role
  const getSidebarLinks = () => {
    const commonLinks = [
      { to: "/dashboard", label: "Dashboard", icon: GoHome },
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
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    {user?.name?.charAt(0) || <FaUserFriends />}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-card rounded-box w-52 border border-border">
                  <li>
                    <span className="font-semibold">{user?.name}</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">{user?.email}</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">
                      Role: {user?.role}
                    </span>
                  </li>
                  <li className="mt-2">
                    <button onClick={handleLogout} className="text-error">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
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
            {/* Sidebar Header */}
            <div className="p-4 border-b border-sidebar-border">
              <h2 className="text-sidebar-primary font-bold text-lg is-drawer-close:hidden">
                Blood Bond
              </h2>
              <p className="text-sidebar-foreground text-sm is-drawer-close:hidden">
                {user?.role} Dashboard
              </p>
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
