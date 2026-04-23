import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@root/App";
import "./index.css";
import { applyTheme, getDefaultTheme, watchSystemTheme } from "@root/lib/theme/theme";
import type { Theme } from "@root/pages/SettingPage/types";
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
