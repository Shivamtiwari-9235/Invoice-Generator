import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChartColumn,
  FilePlus,
  LayoutDashboard,
  ReceiptText,
  Sparkles,
  Users,
  Wallet,
  LogOut,
  X,
} from "lucide-react";
import { APP_NAME, SIDEBAR_ITEMS } from "../../utils/constants";
import { cn } from "../../utils/helpers";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button.jsx";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  "file-plus": FilePlus,
  "receipt-text": ReceiptText,
  wallet: Wallet,
  sparkles: Sparkles,
  "chart-column": ChartColumn,
};

const Sidebar = ({ open, onClose }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const syncDesktopState = () => setIsDesktop(mediaQuery.matches);

    syncDesktopState();
    mediaQuery.addEventListener("change", syncDesktopState);

    return () => mediaQuery.removeEventListener("change", syncDesktopState);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <motion.aside
        initial={false}
        animate={{ x: isDesktop || open ? 0 : -320 }}
        className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-slate-950 px-3 py-4 text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-indigo-300">SaaS Dashboard</p>
            <h2 className="mt-2 text-lg font-semibold">{APP_NAME}</h2>
          </div>
          <Button variant="ghost" className="text-slate-300 hover:bg-white/10 lg:hidden" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 scrollbar-thin">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/app"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  )
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-3 rounded-[24px] border border-white/10 bg-white/5 p-3.5">
          <p className="text-sm font-medium text-white">Need a quick logout?</p>
          <p className="mt-1 text-xs leading-5 text-slate-300">
            Use this when you switch accounts or test authentication flows.
          </p>
          <Button className="mt-4 w-full" variant="outline" onClick={logout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;