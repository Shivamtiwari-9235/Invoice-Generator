import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <label className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
    <Search size={18} className="text-slate-400" />
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
    />
  </label>
);

export default SearchBar;