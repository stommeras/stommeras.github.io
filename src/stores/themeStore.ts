import { create } from "zustand";
import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from "../constants";

interface ThemeStore {
  colorMode: string | undefined;
  setColorMode: (newValue: string) => void;
}

const applyThemeToDOM = (colorMode: string) => {
  const root = window.document.documentElement;

  localStorage.setItem(COLOR_MODE_KEY, colorMode);
  root.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode);
  Object.entries(COLORS).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`;
    root.style.setProperty(cssVarName, colorByTheme[colorMode as keyof typeof colorByTheme]);
  });
};

const root = window.document.documentElement;
let initialColorValue = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP);

if (!initialColorValue) {
  const persistedPreference = localStorage.getItem(COLOR_MODE_KEY);
  if (persistedPreference) {
    initialColorValue = persistedPreference;
  } else {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    initialColorValue = mql.matches ? "dark" : "light";
  }
}

export const useTheme = create<ThemeStore>((set) => ({
  colorMode: initialColorValue,

  setColorMode: (newValue: string) => {
    applyThemeToDOM(newValue);
    set({ colorMode: newValue });
  },
}));
