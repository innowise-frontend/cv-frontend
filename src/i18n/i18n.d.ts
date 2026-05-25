import "i18next";
import type { TranslationTypes } from "./translations/TranslationTypes";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: TranslationTypes;
  }
}
