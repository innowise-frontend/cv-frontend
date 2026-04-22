import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@root/App";
import "./index.css";
import type { Theme } from "@root/pages/SettingPage/types";
import { applyTheme, getDefaultTheme, watchSystemTheme } from "@root/utils/theme";
import "@root/i18n/i18n";

applyTheme(getDefaultTheme() as Theme);

watchSystemTheme(() => {
  const theme = getDefaultTheme();
  applyTheme(theme as Theme);
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
