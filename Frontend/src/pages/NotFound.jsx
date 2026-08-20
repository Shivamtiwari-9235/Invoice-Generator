import { Link } from "react-router-dom";
import Seo from "../components/seo/Seo.jsx";
import Button from "../components/common/Button.jsx";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <Seo title="Page not found" description="The requested page was not found." path="*" />
    <div className="soft-card max-w-lg rounded-[32px] p-10 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link to="/app">
          <Button>Open Dashboard</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;