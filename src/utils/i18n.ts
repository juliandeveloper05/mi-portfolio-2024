// i18n.ts
import i18next from "i18next";

const translations = {
  en: {
    welcome: "Welcome",
    about: "About",
    services: "Services",
    contact: "Contact",
    // Other English translations...
  },
  es: {
    welcome: "Bienvenido",
    about: "Acerca de",
    services: "Servicios",
    contact: "Contacto",
    // Other Spanish translations...
  },
  // You can add more languages here if needed
};

// Initialize i18next only once
i18next.init({
  lng: "en", // Default language
  resources: translations,
});

export default i18next;
