/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    // Estas son todas las configuraciones de locales que deseas admitir en tu aplicación
    locales: ["en", "es"], // Añade aquí los locales que necesites
    // Este es el locale predeterminado que deseas que se use cuando se visite una ruta sin prefijo de locale, como `/hello`
    defaultLocale: "en",
    localeDetection: false, // Desactivar la detección automática del idioma
  },
};
