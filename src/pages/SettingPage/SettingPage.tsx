import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangePassword } from "@components/ChangePassword";
import { Select } from "@components/shared/Select/Select";
import { LOCAL_STORAGE_KEYS } from "@root/constants/localStorage";
import { useLocalStorage } from "@root/hooks/useLocalStorage";
import { applyTheme } from "@utils/theme";
import { LANGUAGES, THEMES } from "./constants";
import type { Theme } from "./types";

export function SettingPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useLocalStorage<Theme>(LOCAL_STORAGE_KEYS.THEME, "light");
  const [language, setLanguage] = useState(i18n.resolvedLanguage ?? "en");

  const handleThemeChange = (value: string) => {
    const next = value as Theme;
    setTheme(next);
    applyTheme(next);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    void i18n.changeLanguage(value);
  };

  const themesList = THEMES.map((item) => ({
    ...item,
    label: t(`theme.${item.value}`),
  }));

  return (
    <div className="flex flex-col mt-10 gap-8 mx-auto">
      <Select
        className="w-[852px]"
        label={t("page.setting.theme")}
        list={themesList}
        placeholder={t("page.setting.selectThemePlaceholder")}
        value={theme}
        onValueChange={handleThemeChange}
      />
      <Select
        className="w-[852px]"
        label={t("page.setting.language")}
        list={LANGUAGES}
        placeholder={t("page.setting.selectLanguagePlaceholder")}
        value={language}
        onValueChange={handleLanguageChange}
      />
      <ChangePassword className="mt-2" />
    </div>
  );
}
