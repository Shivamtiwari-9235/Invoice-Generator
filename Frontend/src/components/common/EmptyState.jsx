import { Inbox } from "lucide-react";
import Button from "./Button.jsx";

const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white px-6 py-14 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
      <Inbox size={28} />
    </div>
    <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    {actionLabel ? (
      <Button className="mt-6" onClick={onAction}>
        {actionLabel}
      </Button>
    ) : null}
  </div>
);

export default EmptyState;