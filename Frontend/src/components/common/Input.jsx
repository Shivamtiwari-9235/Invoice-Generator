import { forwardRef } from "react";
import { cn } from "../../utils/helpers";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => (
  <label className="block">
    {label ? <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span> : null}
    <input
      ref={ref}
      className={cn(
        "input-focus h-10 w-full rounded-2xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500",
        error ? "border-rose-400" : "",
        className
      )}
      {...props}
    />
    {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
  </label>
));

Input.displayName = "Input";

export default Input;