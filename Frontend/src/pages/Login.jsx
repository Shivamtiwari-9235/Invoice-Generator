import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || "/app", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Seo title="Login" description="Sign in to Invoice Generator." path="/login" />
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Welcome back</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">Login to your workspace</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Use your email and password to open the freelancer dashboard.</p>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
          required
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(event) => setFormData((previous) => ({ ...previous, password: event.target.value }))}
          required
        />

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        New here? <Link to="/register" className="font-medium text-indigo-600">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;