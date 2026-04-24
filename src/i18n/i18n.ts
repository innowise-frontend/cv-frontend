import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { LOCAL_STORAGE_KEYS } from "@root/constants/localStorage";
import de from "@root/i18n/translations/de.json";
import en from "@root/i18n/translations/en.json";
import es from "@root/i18n/translations/es.json";
import fr from "@root/i18n/translations/fr.json";
import it from "@root/i18n/translations/it.json";
import pl from "@root/i18n/translations/pl.json";
import pt from "@root/i18n/translations/pt.json";
import ru from "@root/i18n/translations/ru.json";
import type { TranslationTypes } from "./translations/TranslationTypes";

const resources: Record<string, { translation: TranslationTypes }> = {
  en: { translation: en as TranslationTypes },
  ru: { translation: ru as TranslationTypes },
  de: { translation: de as TranslationTypes },
  pl: { translation: pl as TranslationTypes },
  it: { translation: it as TranslationTypes },
  es: { translation: es as TranslationTypes },
  fr: { translation: fr as TranslationTypes },
  pt: { translation: pt as TranslationTypes },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: LOCAL_STORAGE_KEYS.LANGUAGE,
    },
    fallbackLng: "en",
    supportedLngs: ["en", "ru", "de", "pl", "it", "es", "fr", "pt"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
