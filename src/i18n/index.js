import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const getBrowserLanguage = () => {
  const language = navigator.language || navigator.userLanguage;
  const languageCode = language.split("-")[0];
  return languageCode === "es" ? "es" : "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getBrowserLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
