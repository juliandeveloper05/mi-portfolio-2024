/* eslint-disable react/no-unescaped-entities */
import React, { FormEvent, useRef, useState } from "react";
import SectionHeading from "./section-heading"; // Ajusta la ruta según tu proyecto
import { FiSend, FiLoader } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import emailjs from "@emailjs/browser";

// Tipos de error que queremos manejar
type ErrorType = "EMPTY_FIELDS" | "SEND_ERROR" | null;

export default function ContactMe() {
  // Hook de traducción (opcional, si usas next-i18next)
  const { t } = useTranslation("contact");

  // Referencias a los campos del formulario
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Estados
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);

  // Función que se ejecuta al enviar el formulario
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Obtenemos los valores de los campos
    const senderEmail = emailRef.current?.value.trim();
    const message = messageRef.current?.value.trim();

    // Verificamos si están vacíos
    if (!senderEmail || !message) {
      setError("EMPTY_FIELDS");
      setIsLoading(false);
      return;
    }

    // Objetos que envías a tu plantilla de EmailJS
    const templateParams = {
      email: senderEmail,
      message: message,
    };

    // Llamada a EmailJS
    emailjs
      .send(
        process.env.NEXT_PUBLIC_SENDGRID_SERVICE_NAME || "",
        process.env.NEXT_PUBLIC_SENDGRID_TEMPLATE_NAME || "",
        templateParams,
        process.env.NEXT_PUBLIC_SENDGRID_USER_KEY
      )
      .then(() => {
        // Éxito
        setMessageSent(true);
        setIsLoading(false);

        // Resetea el formulario
        formRef.current?.reset();

        // Oculta el mensaje de éxito después de 3s
        setTimeout(() => setMessageSent(false), 3000);
      })
      .catch((error) => {
        // Error en el envío
        console.error("EmailJS error:", error);
        setError("SEND_ERROR");
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="mb-20 mx-auto sm:mb-28 py-14">
      {/* Encabezado de la sección */}
      <SectionHeading>{t("contact1") /* Ej: "Contáctame" */}</SectionHeading>

      {/* Texto de introducción */}
      <p className="text-white text-center text-lg leading-relaxed mb-8">
        {t("contact2") /* Ej: "Para cualquier duda, escribe a" */}
        <a
          className="text-indigo-600 hover:text-indigo-800 transition-colors mx-2"
          href="mailto:juliansoto.dev@gmail.com"
        >
          juliansoto.dev@gmail.com
        </a>
        {t("contact3") /* Ej: "o rellena el formulario:" */}
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
          placeholder={t("contact4") /* Ej: "Tu correo" */}
          className="h-14 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all px-4 text-black"
          ref={emailRef}
        />

        {/* Campo Mensaje */}
        <textarea
          placeholder={t("contact5") /* Ej: "Tu mensaje" */}
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
          {t("contact6") /* Ej: "Enviar" */}
        </button>

        {/* Mensaje de éxito */}
        {messageSent && (
          <div className="text-green-500 text-center font-bold mt-3">
            {t("contact7") /* Ej: "¡Mensaje enviado exitosamente!" */}
          </div>
        )}

        {/* Errores */}
        {error === "EMPTY_FIELDS" && (
          <div className="text-red-500 text-center font-bold mt-3">
            {t("contact8") /* Ej: "Los campos no pueden estar vacíos" */}
          </div>
        )}
        {error === "SEND_ERROR" && (
          <div className="text-red-500 text-center font-bold mt-3">
            {
              t(
                "contact9"
              ) /* Ej: "Hubo un error al enviar. Intenta de nuevo." */
            }
          </div>
        )}
      </form>
    </section>
  );
}
