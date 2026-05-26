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

/**
 * FIX #2 — Eliminate the dark-flash on page load.
 *
 * The flash happens because:
 *  1. The HTML is server-rendered with class="dark".
 *  2. React hydrates, ThemeProvider mounts, reads localStorage, then calls
 *     applyTheme() — but this happens AFTER the browser has already painted
 *     the dark styles.
 *
 * Solution: inject a tiny blocking <script> (via ThemeScript component below)
 * into <head> *before* any CSS or body content is painted.  The script reads
 * localStorage synchronously and sets the correct class on <html> before the
 * first paint, so the browser never shows the wrong theme.
 *
 * Usage in layout.tsx:
 *   import { ThemeScript } from "@/context/ThemeContext";
 *   // Inside <head> (before fonts / CSS links):
 *   <ThemeScript />
 */

// ─── Blocking script injected into <head> ────────────────────────────────────
const themeScriptCode = `
(function(){
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
    document.documentElement.classList.remove('dark','light');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e){}
})();
`;

/**
 * Drop <ThemeScript /> as the very first child of <head> in layout.tsx.
 * It is a plain <script> with no src — the browser executes it inline,
 * synchronously, before any stylesheets or body content is parsed.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScriptCode }}
      suppressHydrationWarning
    />
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function applyTheme(t: Theme) {
  const html = document.documentElement;
  html.classList.remove("dark", "light");
  html.classList.add(t);
  html.setAttribute("data-theme", t);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

    const resolved: Theme =
      stored === "dark" || stored === "light"
        ? stored
        : "dark";

    setTheme(resolved);
    applyTheme(resolved);

    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";

      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);

      return next;
    });
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}