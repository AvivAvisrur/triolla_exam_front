import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          taskTable: "Tasks Table",
          paginationSelectAll: "All",
          paginationRowPerPage: "Rows per page",
        },
      },
      he: {
        translation: {
          taskTable: "טבלת משימות",
          paginationSelectAll: "הכל",
          paginationRowPerPage: "שורות לכל עמוד",
        },
      },
    },
    lng: "he", // Set default language to English or "he" for Hebrew
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
