import { cn } from "../../utils/helpers";

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_14px_30px_rgba(79,70,229,0.25)]",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
  outline: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const sizes = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3.5 py-2 text-sm",
  lg: "px-4.5 py-2.5 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={cn(
      "btn-focus inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;