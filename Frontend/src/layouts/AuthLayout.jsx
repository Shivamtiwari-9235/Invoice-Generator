import { Outlet, Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants";

const AuthLayout = () => (
  <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col overflow-hidden rounded-[32px] bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur-xl lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.45),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.24),_transparent_35%)]" />
        <div className="relative z-10">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            {APP_NAME}
          </Link>
          <h1 className="mt-16 max-w-xl text-5xl font-semibold leading-tight tracking-tight">
            Build invoices, track payments, and grow freelance revenue from one clean dashboard.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300">
            A beginner-friendly website with client management, AI drafts, analytics, and reminder workflows.
          </p>
        </div>
        <div className="relative z-10 grid max-w-xl grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            Client management and invoice tracking
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            Recharts analytics and status charts
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            AI invoice prompt generation
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            Reminder workflows and email notifications
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;