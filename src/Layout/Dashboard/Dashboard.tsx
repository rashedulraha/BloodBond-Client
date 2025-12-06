import { Link, Outlet } from "react-router-dom";

import { GoHome, GoSidebarExpand } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { Bike, HelpCircle, LocateIcon, LogOut } from "lucide-react";
import { LiaFileInvoiceSolid, LiaStoreSolid } from "react-icons/lia";
import { FaListUl, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { MdSendAndArchive } from "react-icons/md";
import { ModeToggle } from "@/components/mode-toggle";
import Container from "@/Page/Shared/Responsive/Container";
import SidebarLink from "./Shared/SidebarLink/SidebarLink";

const Dashboard = () => {
  // Logout Handler
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Container>
      <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* ------------- main dashboard content ------------- */}
        <div className="drawer-content flex flex-col">
          {/* ---------- NAVBAR ---------- */}
          <nav className="navbar flex items-center justify-between w-full bg-base-300 shadow-sm px-4 lg:px-6">
            <div className="flex items-center  gap-2">
              {/* Drawer Toggle for mobile */}
              <label
                htmlFor="my-drawer-4"
                className="btn btn-square btn-ghost shadow-none">
                <GoSidebarExpand size={21} />
              </label>

              <h1 className="text-primary font-bold text-lg">
                <Link to={"/"}>Blood bond</Link>
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

          <div className="flex flex-col bg-base-200 min-h-full is-drawer-close:w-16 is-drawer-open:w-64 border-r border-base-300 duration-300">
            {/* Sidebar Menu */}
            <ul className="menu w-full p-2 py-4 gap-1">
              <SidebarLink
                to="/"
                dataTip="Homepage"
                span="HomePage"
                Icon={GoHome}
              />

              <SidebarLink
                to="/send-parcel"
                dataTip="Send Parcel"
                span="Send Parcel"
                Icon={MdSendAndArchive}
              />

              <SidebarLink
                to="/dashboard/my-parcels"
                dataTip="My Parcels"
                span="My Parcels"
                Icon={FaListUl}
              />

              <SidebarLink
                to="/dashboard/payment-history"
                dataTip="Invoices"
                span="Invoices"
                Icon={LiaFileInvoiceSolid}
              />
              <SidebarLink
                to="/dashboard/approve-rider"
                dataTip="Approve Rider"
                span="Approve Rider"
                Icon={Bike}
              />

              <SidebarLink
                to="/stores"
                dataTip="Stores"
                span="Stores"
                Icon={LiaStoreSolid}
              />

              <SidebarLink
                to="/coverage-area"
                dataTip="Coverage Area"
                span="Coverage Area"
                Icon={LocateIcon}
              />

              <SidebarLink
                to="/pricing-plan"
                dataTip="Pricing Plan"
                span="Pricing Plan"
                Icon={FaRegMoneyBillAlt}
              />

              <SidebarLink
                to="/account-setting"
                dataTip="Settings"
                span="Settings"
                Icon={IoSettingsOutline}
              />

              {/* Password */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-300 rounded-lg flex items-center gap-3 px-3 py-2">
                  <span className="is-drawer-close:hidden">Password</span>
                </button>
              </li>

              {/* Help */}
              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-base-300 rounded-lg flex items-center gap-3 px-3 py-2">
                  <span className="is-drawer-close:hidden">Help</span>
                </button>
              </li>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-error/20 rounded-lg flex items-center gap-3 px-3 py-2 text-error font-semibold">
                  <span className="is-drawer-close:hidden">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
