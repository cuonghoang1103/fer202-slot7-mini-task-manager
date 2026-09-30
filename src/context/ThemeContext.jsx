import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext();

// Provider boc ca App, cung cap theme + ham doi theme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// hook nho de cac component goi cho gon: const { theme } = useTheme()
export function useTheme() {
  return useContext(ThemeContext);
}
