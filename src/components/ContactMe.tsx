import React, { FormEvent, useState } from "react";
import SectionHeading from "./section-heading";
import { FiSend, FiLoader, FiThumbsUp } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function ContactMe() {
  const { t } = useTranslation("contact");
  const formRef = useRef<HTMLFormElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const [messageSent, setMessageSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);

    if (formRef.current && emailRef.current) {
      const senderEmail = emailRef.current.value;
      const templateParams = {
        email: senderEmail,
        message: formRef.current.message.value,
      };

      emailjs
        .send(
          "service_tad13cb",
          "template_rh43gsm",
          templateParams,
          "Yg5GEBfor_PC2rxqk"
        )
        .then((res) => {
          console.log(res.text);
          console.log(`Email sent from: ${senderEmail}`);
          setMessageSent(true);
          formRef.current.reset();
          setIsLoading(false);

          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        })
        .catch((error) => {
          console.log(error.text);
          setIsLoading(false);
        });
    }
  };

  return (
    <section id="contact" className="mb-20 mx-auto sm:mb-28 unselectable">
      <SectionHeading>{t("contact1")}</SectionHeading>
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
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="mt-10 flex flex-col max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder={t("contact4")}
          className="h-14 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all px-4 text-black"
          ref={emailRef}
        />
        <textarea
          name="message"
          placeholder={t("contact5")}
          className="h-52 my-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-4 text-black"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full outline-none px-6 mx-auto sm:mb-10 mb-10 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <FiLoader className="animate-spin" />
          ) : messageSent ? (
            <FiThumbsUp className="text-lg" />
          ) : (
            <>
              {t("contact6")}
              <FiSend className="text-lg" />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
