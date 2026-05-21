"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "crediple-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only respect an explicit stored choice; the premium AI theme defaults dark.
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const resolved: Theme = stored === "dark" || stored === "light" ? stored : "dark";
    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  function applyTheme(t: Theme) {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(t);
    html.setAttribute("data-theme", t);
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {mounted ? (
        children
      ) : (
        <div style={{ visibility: "hidden" }} aria-hidden="true">
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
