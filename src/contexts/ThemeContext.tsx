import { FC, PropsWithChildren, useContext, createContext, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

type Theme = "light" | "dark";

type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const defaultContextValue: ContextType = {
  theme: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ContextType>(defaultContextValue);

type ThemeProviderProps = {};

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "ztlog-theme-preference",
    getInitialTheme()
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value} children={children} />;
};

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};

function getInitialTheme(): Theme {
  return "light";
}
