import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Seo from "../components/seo/Seo.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register(formData);
      navigate("/app", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Seo title="Register" description="Create your Invoice Generator account." path="/register" />
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Start free</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create your account</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Register once and manage clients, invoices, AI prompts, and reminders from one place.</p>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={formData.name}
          onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))}
          required
        />
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
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-500">
        Already have an account? <Link to="/login" className="font-medium text-indigo-600">Login here</Link>
      </p>
    </div>
  );
};

export default Register;