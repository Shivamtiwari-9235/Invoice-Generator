import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, Users, BadgeIndianRupee, ShieldCheck, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../components/seo/Seo.jsx";
import Button from "../components/common/Button.jsx";
import { APP_NAME } from "../utils/constants";

const features = [
  { title: "Client management", description: "Store freelancer clients, company details, and GST numbers in one place.", icon: Users },
  { title: "Invoice workflow", description: "Create, preview, download, and track invoices without touching complex code.", icon: FileText },
  { title: "Smart AI drafts", description: "Use the Ollama + Qwen backend to turn plain English prompts into invoice data.", icon: Sparkles },
  { title: "Reminder emails", description: "Send polite payment reminders with confirmation modals and toast feedback.", icon: Bell },
  { title: "Payment tracking", description: "See paid, pending, and overdue invoices with clean status cards.", icon: BadgeIndianRupee },
  { title: "Protected auth", description: "JWT-powered login, registration, and logout with route protection.", icon: ShieldCheck },
];

const Landing = () => (
  <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
    <Seo title="Home" description="Invoice Generator for freelancers with clients, invoices, AI, analytics, and reminders." path="/" />
    <div className="mx-auto max-w-7xl">
      <header className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-[28px] px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Freelancer SaaS</p>
          <h1 className="text-xl font-semibold text-slate-900">{APP_NAME}</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <section className="grid gap-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Beginner-friendly frontend for freelancer invoicing
          </div>
          <h2 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Run your invoices, clients, and payments from one modern dashboard.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This frontend is built for learning and production at the same time: modular React components, Tailwind v4, route guards, SEO, analytics, and clean API integration.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/register">
              <Button size="lg">
                Start Now <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="soft-card rounded-[32px] p-6"
        >
          <div className="rounded-[28px] bg-slate-950 p-6 text-white">
            <p className="text-sm text-slate-300">AI invoice prompt</p>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              Create an invoice for XYZ Pvt Ltd for MERN Website Development amount is 25000 GST is 18 percent due date is 15 August and payment within seven days.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-indigo-50 p-4">
              <p className="text-xs uppercase text-indigo-500">SEO</p>
              <p className="mt-1 text-sm font-medium text-slate-900">Fast responsive, meta, Ai generative invoice, Best for invoice</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-4">
              <p className="text-xs uppercase text-emerald-500">API</p>
              <p className="mt-1 text-sm font-medium text-slate-900">Invoice Generator, clients, invoices, payments</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="soft-card rounded-[28px] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
            </motion.article>
          );
        })}
      </section>
    </div>
  </div>
);

export default Landing;