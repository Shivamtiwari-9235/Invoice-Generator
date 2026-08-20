const Loader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[30vh] items-center justify-center py-10">
    <div className="flex flex-col items-center gap-3 text-sm text-slate-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      <span>{label}</span>
    </div>
  </div>
);

export default Loader;