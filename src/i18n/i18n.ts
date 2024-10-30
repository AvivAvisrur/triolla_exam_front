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
          titleColumn: "Title",
          descriptionColumn: "description",
          priorityColumn: "Priority",
          createdAtColumn: "Created at",
          home: "Home",
          createTask: "Create Task",
          userCreated: "User created successfully",
          userNotCreated: "User not created",
          actions: "Actions",
          titleSearch: "Search Title",
          lowPriority: "Low Priority",
          midPriority: "Mid Priority",
          highPriority: "High Priority",
        },
      },
      he: {
        translation: {
          taskTable: "טבלת משימות",
          paginationSelectAll: "הכל",
          paginationRowPerPage: "שורות לכל עמוד",
          titleColumn: "כותרת",
          descriptionColumn: "תיאור",
          priorityColumn: "חשיבות",
          createdAtColumn: "נוצר בתאריך",
          home: "בית",
          createTask: "צור משימה",
          userCreated: "משתמש נוצר בהצלחה",
          userNotCreated: "משתמש לא נוצר עקב תקלה",
          actions: "פעולות נוספות",
          titleSearch: "חפש כותרת",
          lowPriority: "חשיבות נמוכה",
          midPriority: "חשיבות בינונית",
          highPriority: "חשיבות גבוהה",
        },
      },
    },
    lng: "en", // Set default language to English or "he" for Hebrew
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
