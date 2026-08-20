import { Bell, Menu, LogOut, MoonStar, Search, SunMedium } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { APP_NAME } from "../../utils/constants";
import { getInitials } from "../../utils/helpers";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const name = user?.name || "Freelancer";
  const isDarkTheme = theme === "dark";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="lg:hidden" onClick={onMenuClick}>
            <Menu size={18} />
          </Button>
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">{APP_NAME}</p>
            <h1 className="text-base font-semibold text-slate-900 lg:text-lg">Welcome back, {name.split(" ")[0]}</h1>
          </div>
        </div>

        <div className="hidden max-w-lg flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 lg:flex">
          <Search size={16} className="mr-3 text-slate-400" />
          Search across clients, invoices, and payments from the sidebar pages.
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="relative">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
          </Button>

          <Button
            variant="outline"
            className="inline-flex rounded-full px-3 py-2 text-sm font-medium shadow-sm"
            onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
            aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDarkTheme ? <SunMedium size={16} /> : <MoonStar size={16} />}
            <span className="hidden sm:inline">{isDarkTheme ? "Light" : "Dark"}</span>
          </Button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              {getInitials(name) || "U"}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{name}</p>
              <p className="text-xs text-slate-500">Freelancer workspace</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="hidden sm:inline-flex"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;