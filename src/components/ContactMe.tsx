import React, { FormEvent, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { FiSend, FiLoader } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import emailjs from "@emailjs/browser";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function ContactMe() {
  const { t } = useTranslation("contact");
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          ? "linear-gradient(to right, #00b09b, #96c93d)"
          : "linear-gradient(to right, #ff5f6d, #ffc371)",
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
        showToast(t("contact7"), true);
        setIsLoading(false);
        formRef.current?.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        showToast(t("contact9"), false);
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="mb-20 mx-auto sm:mb-28 py-14">
      {/* Encabezado de la sección */}
      <SectionHeading>{t("contact1")}</SectionHeading>

      {/* Texto de introducción */}
      <p className="text-white text-center text-lg leading-relaxed mb-8">
        {t("contact2")}
        <a
          className="text-indigo-600 hover:text-indigo-800 transition-colors mx-2"
          href="mailto:juliansoto.dev@gmail.com"
        >
          juliansoto.dev@gmail.com
        </a>
        {t("contact3")}
      </p>

      {/* Formulario */}
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="mt-10 flex flex-col max-w-md mx-auto"
      >
        {/* Campo Email */}
        <input
          type="email"
          placeholder={t("contact4")}
          className="h-14 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all px-4 text-black"
          ref={emailRef}
        />

        {/* Campo Mensaje */}
        <textarea
          placeholder={t("contact5")}
          className="h-52 my-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-4 text-black"
          ref={messageRef}
        />

        {/* Botón de Enviar */}
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full outline-none px-6 mx-auto sm:mb-4 mb-4 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
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
    </section>
  );
}
