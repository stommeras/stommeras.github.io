import { create } from "zustand";
import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from "../constants";

interface ThemeStore {
  colorMode: string | undefined;
  setColorMode: (newValue: string) => void;
  initializeColorMode: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  colorMode: undefined,

  setColorMode: (newValue: string) => {
    const root = window.document.documentElement;

    localStorage.setItem(COLOR_MODE_KEY, newValue);
    root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, newValue);

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`;
      root.style.setProperty(cssVarName, colorByTheme[newValue as keyof typeof colorByTheme]);
    });

    set({ colorMode: newValue });
  },

  initializeColorMode: () => {
    const root = window.document.documentElement;
    let initialColorValue = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP);

    // Fallback if the Vite plugin script hasn't run yet
    if (!initialColorValue) {
      const persistedPreference = localStorage.getItem(COLOR_MODE_KEY);
      if (persistedPreference) {
        initialColorValue = persistedPreference;
      } else {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");
        initialColorValue = mql.matches ? "dark" : "light";
      }

      // Apply the CSS properties since the plugin script didn't run
      root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, initialColorValue);
      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;
        root.style.setProperty(cssVarName, colorByTheme[initialColorValue as keyof typeof colorByTheme]);
      });
    }

    set({ colorMode: initialColorValue });
  },
}));

// Call this once when your app initializes
if (typeof window !== "undefined") {
  useTheme.getState().initializeColorMode();
}
