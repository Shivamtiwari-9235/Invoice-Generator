import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("invoice-generator-theme") || "light");

  useEffect(() => {
    localStorage.setItem("invoice-generator-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;