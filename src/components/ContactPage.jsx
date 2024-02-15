import { motion } from "framer-motion";
import React, { useState } from "react";

const ContactPage = () => {
  const text = "Say Hello";
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    mail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          content: "",
          mail: "",
        });
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitSuccess(false);
    }
  };

  return (
    <section id="contact" className="bg-black text-gray-100 pt-16 pb-8">
      <motion.div
        className="h-full"
        initial={{ y: "-200v" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
          {/*TEXT CONTAINER*/}
          <div className="h-full lg:h-auto lg:w-1/2 flex items-center justify-center text-7xl">
            <div className="mb-4 flex flex-col items-center">
              {text.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
          {/*FORM CONTAINER*/}
          <form
            onSubmit={handleSubmit}
            className="h-1/2 lg:h-full lg:w-1/2 bg-red-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24"
          >
            <span className="text-black">Dear Julian Soto,</span>
            <textarea
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              row={6}
              className="bg-transparent border-b-2 border-black text-black outline-none resize-none"
            />
            <span className="text-black">My mail adress is:</span>
            <input
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              type="text"
              className="bg-transparent border-b-2 border-black text-black outline-none"
            />
            <span className="text-black">Regards</span>
            <button
              type="submit"
              className="bg-purple-200 rounded font-semibold text-gray-600 p-4"
            >
              Send
            </button>
          </form>
          {submitSuccess && (
            <span className="text-green-600">
              Your message has been sent successfully!
            </span>
          )}
          {error && <span>Something went wrong!</span>}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactPage;
