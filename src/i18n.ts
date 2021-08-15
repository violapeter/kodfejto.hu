import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import hu from "./locales/hu.json"

i18n.use(initReactI18next).init({
  defaultNS: "translations",
  resources: { en, hu },
  lng: "hu",
  fallbackLng: ["hu", "en"],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
