import { useCallback } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";

type EventType =
  | "project_click"
  | "form_view"
  | "form_submit"
  | "section_view"
  | "filter_use";

export function useAnalytics() {
  const { i18n } = useTranslation();
  const { resolvedTheme } = useTheme();

  const trackEvent = useCallback(
    (eventType: EventType, eventData: Record<string, unknown> = {}) => {
      try {
        const payload = JSON.stringify({
          eventType,
          eventData,
          locale: i18n.language,
          theme: resolvedTheme,
        });

        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          navigator.sendBeacon("/api/analytics/track", payload);
        } else {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // silently fail — analytics should never break the app
      }
    },
    [i18n.language, resolvedTheme]
  );

  return { trackEvent };
}
