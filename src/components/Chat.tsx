import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface IntellitickSettings {
  appearance?: {
    theme?: {
      primaryColor?: string;
      secondaryColor?: string;
    };
    position?: {
      bottom?: string;
      right?: string;
    };
  };
  messages?: {
    welcome?: string;
    offline?: string;
    header?: string;
  };
  triggers?: {
    timeOnPage?: number;
    exitIntent?: boolean;
  };
}

interface IntellitickWindow extends Window {
  iticks?: {
    host: string;
    settings: IntellitickSettings;
    clientId: string;
    cdn: string;
    queue: Array<[string, any]>;
    call: (a: string, b: any) => void;
  };
}

declare const window: IntellitickWindow;

const Chat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("chat");

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const footerHeight = 70;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const buffer = 100;

    if (
      currentScrollY + windowHeight >
      documentHeight - footerHeight - buffer
    ) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) return;

    const initializeIntelliticks = () => {
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
        I.iticks.call = function (a, b) {
          if (I.iticks) {
            I.iticks.queue.push([a, b]);
          }
        };
      })(
        window,
        "https://cdn-v1.intelliticks.com/prod/common",
        document,
        "script",
        "https://app.intelliticks.com",
        "s2T7oTkLuabZ9qbBx_c",
        {
          appearance: {
            theme: {
              primaryColor: "#00ff9d",
              secondaryColor: "#ffffff",
            },
            position: {
              bottom: "100px",
              right: "20px",
            },
          },
          messages: {
            header: t("header"),
            welcome: t("welcome"),
            offline: t("offline"),
          },
          triggers: {
            timeOnPage: 30,
            exitIntent: true,
          },
        }
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (typeof window !== "undefined") {
      initializeIntelliticks();
      setInitialized(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, initialized, t]);

  // Update messages when language changes
  useEffect(() => {
    if (window.iticks && window.iticks.call) {
      window.iticks.call("updateSettings", {
        messages: {
          header: t("header"),
          welcome: t("welcome"),
          offline: t("offline"),
        },
      });
    }
  }, [locale, t]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="fixed z-50 transition-all duration-300"
          style={{
            bottom: "100px",
            right: "20px",
            willChange: "transform, opacity",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default Chat;
