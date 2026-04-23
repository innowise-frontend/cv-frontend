import { LOCAL_STORAGE_KEYS } from "@constants/localStorage";
import type { Theme } from "@pages/SettingPage/types";

export function getDefaultTheme(): Theme {
  const theme = (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme) ?? "light";

  return theme as Theme;
}

export function setDefaultTheme(theme: Theme) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme.toLowerCase());

  const isDark =
    theme === "dark" ||
    (theme === "device" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  document.documentElement.classList.toggle("dark", isDark);
  applyTheme(theme as Theme);
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const resolvedTheme = theme === "device" ? getSystemTheme() : theme;

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
}

export function watchSystemTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", () => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme;

    if (theme === "device") {
      onChange();
    }
  });
}
