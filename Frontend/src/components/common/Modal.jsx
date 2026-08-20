import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button.jsx";

const Modal = ({ open, title, description, children, onClose, size = "lg" }) => {
  if (!open) {
    return null;
  }

  const widthClass = size === "xl" ? "max-w-5xl" : size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-4 py-6 backdrop-blur-sm sm:py-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          className={`mx-auto my-0 w-full ${widthClass} overflow-hidden rounded-[24px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.24)] sm:my-4 sm:rounded-[28px]`}
        >
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </Button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;