import React from "react";
import SectionHeading from "./section-heading";
import { FiSend } from "react-icons/fi";
import SvgCurve from "./svg-curve";

export default function ContactMe() {
  return (
    <section id="contact" className="mb-20 mx-auto sm:mb-28">
      <SectionHeading>
        Contact Me
        <SvgCurve />
      </SectionHeading>
      <p className="text-white text-center text-lg leading-relaxed mb-8">
        Please contact me directly at{" "}
        <a
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
          href="mailto:juliansoto.dev@gmail.com"
        >
          juliansoto.dev@gmail.com
        </a>{" "}
        or through this form
      </p>
      <form className="mt-10 flex flex-col max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="h-14 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all px-4 text-gray-700"
        />
        <textarea
          placeholder="Your message"
          className="h-52 my-3 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-4 text-gray-700"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-full outline-none px-6 mx-auto sm:mb-10 mb-10"
        >
          Submit <FiSend className="text-lg" />
        </button>
      </form>
    </section>
  );
}
