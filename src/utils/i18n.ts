import i18next from "i18next";

const translations = {
  en: {
    welcome: "Welcome",
    about: "About",
    services: "Services",
    contact: "Contact",
  },
  es: {
    welcome: "Bienvenido",
    about: "Acerca de",
    services: "Servicios",
    contact: "Contacto",
  },
};

i18next.init({
  lng: "en",
  resources: translations,
});

export default i18next;
