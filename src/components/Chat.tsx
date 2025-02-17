import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// Definimos los tipos correctos para el objeto Intelliticks en window
declare global {
  interface Window {
    iticks?: {
      host: string;
      settings: any;
      clientId: string;
      cdn: string;
      queue: any[];
      call: (action: string, params: any) => void;
    };
  }
}

const Chat: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("chat");

  useEffect(() => {
    // Solo inicializamos una vez
    if (initialized) return;

    const initChat = () => {
      // Eliminamos cualquier inicialización existente de Intelliticks
      if (window.iticks) {
        delete window.iticks;
      }

      // Inicializamos Intelliticks con la configuración adecuada
      const settings = {
        appearance: {
          theme: {
            primaryColor: "#00ff9d", // Color principal que coincide con tu diseño
            secondaryColor: "#ffffff",
          },
          position: {
            bottom: "20px",
            right: "20px",
          },
        },
        messages: {
          header: t("header"),
          welcome: t("welcome"),
          offline: t("offline"),
        },
        triggers: {
          timeOnPage: 15, // Mostrar después de 15 segundos
          exitIntent: true,
        },
      };

      (function (I, L, T, i, c, k, s) {
        if (I.iticks) return;
        I.iticks = {
          host: c,
          settings: s,
          clientId: k,
          cdn: L,
          queue: [],
          call: function (a: string, b: any) {
            this.queue.push([a, b]);
          },
        };

        const h = T.head || T.documentElement;
        const e = T.createElement(i) as HTMLScriptElement;
        e.async = true;
        e.src = (L || c) + "/client/inject-v2.min.js";
        h.insertBefore(e, h.firstChild);
      })(
        window,
        "https://cdn-v1.intelliticks.com/prod/common",
        document,
        "script",
        "https://app.intelliticks.com",
        "s2T7oTkLuabZ9qbBx_c",
        settings
      );

      setInitialized(true);
    };

    // Inicializamos el chat cuando el componente se monta
    initChat();

    // Actualizamos la configuración del chat cuando cambia el idioma
    const updateChatLanguage = () => {
      if (window.iticks?.call) {
        window.iticks.call("updateSettings", {
          messages: {
            header: t("header"),
            welcome: t("welcome"),
            offline: t("offline"),
          },
        });
      }
    };

    // Escuchamos cambios de ruta para actualizar el idioma
    router.events.on("routeChangeComplete", updateChatLanguage);

    return () => {
      router.events.off("routeChangeComplete", updateChatLanguage);
    };
  }, [initialized, t, router]);

  // El widget del chat se inyecta directamente en el DOM, no necesitamos renderizar nada
  return null;
};

export default Chat;
