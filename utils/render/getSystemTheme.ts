import { ColorScheme } from "@react-types/provider";

export const getSystemTheme = (): ColorScheme => {
  if (typeof window === "undefined") return "light";

  const _defaultTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  const localStorageTheme = localStorage.getItem("theme") as ColorScheme;

  if (localStorageTheme && (["light", "dark"] as ColorScheme[]).includes(localStorageTheme)) {
    return localStorageTheme;
  } else {
    localStorage.removeItem("theme");
    return _defaultTheme;
  }
};
