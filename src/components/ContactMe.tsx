import React, { FormEvent, useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { FiSend, FiLoader } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import emailjs from "@emailjs/browser";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ContactMe() {
  const { t } = useTranslation("contact");
  const { trackEvent } = useAnalytics();
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("form_view", { section: "contact" });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trackEvent]);

  const showToast = (message: string, isSuccess: boolean) => {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      className: "unselectable",
      style: {
        background: isSuccess
          ? "linear-gradient(to right, #12b886, #20c997)"
          : "linear-gradient(to right, #ff5f6d, #ffc371)",
        borderRadius: "12px",
      },
    }).showToast();
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const senderEmail = emailRef.current?.value.trim();
    const message = messageRef.current?.value.trim();

    if (!senderEmail || !message) {
      showToast(t("contact8"), false);
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      showToast(t("contact8"), false);
      setIsLoading(false);
      return;
    }

    const templateParams = {
      email: senderEmail,
      message: message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SENDGRID_SERVICE_NAME || "",
        process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_NAME || "",
        templateParams,
        process.env.NEXT_PUBLIC_SENDGRID_USER_KEY
      )
      .then(() => {
        trackEvent("form_submit", { status: "success" });
        showToast(t("contact7"), true);
        setIsLoading(false);
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        trackEvent("form_submit", { status: "error" });
        showToast(t("contact9"), false);
        setIsLoading(false);
      });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 unselectable">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <SectionHeading>{t("contact1")}</SectionHeading>

        <p className="text-[var(--theme-text-secondary)] text-center text-body-lg leading-relaxed mb-10">
          {t("contact2")}
          <a
            className="text-[var(--theme-accent)] hover:text-[#20c997] transition-colors mx-1"
            href="mailto:juliansoto.dev@gmail.com"
          >
            juliansoto.dev@gmail.com
          </a>
          {t("contact3")}
        </p>

        <div className="glass rounded-2xl p-6 md:p-8">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col gap-4"
          >
            <input
              type="email"
              placeholder={t("contact4")}
              className="h-12 rounded-xl bg-[var(--theme-input-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder:text-[var(--theme-input-placeholder)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10 transition-all px-4 text-sm outline-none"
              ref={emailRef}
            />

            <textarea
              placeholder={t("contact5")}
              className="h-40 rounded-xl bg-[var(--theme-input-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] placeholder:text-[var(--theme-input-placeholder)] focus:border-[var(--theme-accent)]/50 focus:ring-2 focus:ring-[var(--theme-accent)]/10 transition-all p-4 text-sm outline-none resize-none"
              ref={messageRef}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 h-12 bg-[var(--theme-accent)] hover:bg-[#20c997] transition-all text-white font-semibold rounded-xl outline-none px-6 text-sm ${
                isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.02]"
              }`}
            >
              {isLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FiSend className="text-lg" />
              )}
              {t("contact6")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
