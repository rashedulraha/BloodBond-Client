import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <nav className="h-16 bg-slate-900 text-white flex items-center px-8 py-4 shadow-lg z-10">
        <Link to={"/"} className="text-xl font-bold">
          Bloodbond
        </Link>
      </nav>

      <main className="flex overflow-hidden">
        <div className="hidden flex-1  lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1974&auto=format&fit=crop"
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full flex-1 overflow-scroll">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
