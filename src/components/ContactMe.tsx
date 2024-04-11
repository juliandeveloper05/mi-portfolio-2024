import React from "react";
import SectionHeading from "./section-heading";
import { FiSend } from "react-icons/fi";
import SvgCurve from "./svg-curve";
import { useTranslation } from "next-i18next";
import MagneticWrapper from "./magnetic-wrapper";

export default function ContactMe() {
  const { t } = useTranslation("contact");

  return (
    <section id="contact" className="mb-20 mx-auto sm:mb-28 unselectable">
      <SectionHeading>
        {t("contact1")}
      </SectionHeading>
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
      <form className="mt-10 flex flex-col max-w-md mx-auto">
        <input
          type="email"
          placeholder={t("contact4")}
          className="h-14 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all px-4 text-black"
        />
        <textarea
          placeholder={t("contact5")}
          className="h-52 my-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-4 text-black"
        />
        <MagneticWrapper>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full outline-none px-6 mx-auto sm:mb-10 mb-10"
          >
            {t("contact6")} <FiSend className="text-lg" />
          </button>
        </MagneticWrapper>
      </form>
    </section>
  );
}
