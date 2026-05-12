import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangePassword } from "@components/ChangePassword";
import { Breadcrumbs, ROUTES } from "@root/components/shared";
import { Select } from "@root/components/shared/Select/Select";
import { getDefaultTheme, setDefaultTheme } from "@root/lib/theme/theme";
import { LANGUAGES, THEMES } from "./constants";
import type { Theme } from "./types";

export const SettingPage = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>(getDefaultTheme);
  console.log(theme);
  const [language, setLanguage] = useState(i18n.resolvedLanguage ?? "en");

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
    setDefaultTheme(value as Theme);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  const themesList = THEMES.map((item) => ({
    ...item,
    label: t(`theme.${item.value}`),
  }));

  return (
    <div className="flex flex-col ml-2">
      <Breadcrumbs
        items={[{ label: t("page.setting.breadcrumbs"), href: ROUTES.SETTINGS }]}
        className="pb-4 ml-9"
      />
      <div className="flex flex-col w-[852px] m-auto gap-9">
        <Select
          label={t("page.setting.language")}
          list={LANGUAGES}
          placeholder={t("page.setting.selectLanguagePlaceholder")}
          value={language}
          onValueChange={handleLanguageChange}
        />
        <Select
          label={t("page.setting.theme")}
          list={themesList}
          placeholder={t("page.setting.selectThemePlaceholder")}
          value={theme}
          onValueChange={handleThemeChange}
        />
        <ChangePassword className="mt-2" />
      </div>
    </div>
  );
};
