import { useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(true);
    } else {
      setSubmitSuccess(false);
    }
  };

  return (
    <section id="contact" className="bg-black text-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Contact Me!
        </h2>
        {submitSuccess && (
          <div className="text-green-500 text-center">
            Your message has been sent successfully!
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-xl mt-12"
        >
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="block mb-2 text-gray-300">
                Email Address
              </label>
              <div className="flex items-center bg-gray-700 border-2 border-gray-600 rounded-md">
                <HiMail className="text-gray-400 m-2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-transparent text-white"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block mb-2 text-gray-300">
                Mobile Number
              </label>
              <div className="flex items-center bg-gray-700 border-2 border-gray-600 rounded-md">
                <HiPhone className="text-gray-400 m-2" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-transparent text-white"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block mb-2 text-gray-300">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white border-2 border-gray-600 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2 text-gray-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white border-2 border-gray-600 rounded-md h-32"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-white font-bold rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
