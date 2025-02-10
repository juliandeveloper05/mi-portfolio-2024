import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const FloatingNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("profile");
  const { t, i18n } = useTranslation("navbar");

  const navItems = [
    "profile",
    "about",
    "services",
    "projects",
    "approach",
    "contact",
  ];

  const handleNavLinkClick = (navItem: string) => {
    setIsOpen(false);
    setSelectedNavItem(navItem);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    router.replace(router.asPath, undefined, {
      locale: lang,
      scroll: false,
    });
    window.scrollTo(0, currentScrollPosition);
    setIsOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-4 inset-x-0 mx-auto z-50"
      >
        <div className="flex justify-between items-center max-w-4xl mx-auto px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/[0.25] shadow-lg">
          {/* Logo */}
          <Link to="profile" className="cursor-pointer">
            <Image
              src="/newlogo.png"
              alt="Logo"
              width={40}
              height={40}
              className="website-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item}
                to={item}
                spy={true}
                smooth={true}
                duration={800}
                onClick={() => handleNavLinkClick(item)}
                className={`text-white hover:text-purple-400 cursor-pointer transition-colors ${
                  selectedNavItem === item ? "border-b-2 border-purple-800" : ""
                }`}
              >
                {t(item)}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLanguage("en")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              EN
            </button>
            <span className="text-white">/</span>
            <button
              onClick={() => changeLanguage("es")}
              className="text-white hover:text-purple-400 transition-colors"
            >
              ES
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-black/90 backdrop-blur-sm md:hidden rounded-lg mx-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    to={item}
                    spy={true}
                    smooth={true}
                    duration={800}
                    onClick={() => handleNavLinkClick(item)}
                    className="text-white hover:text-purple-400 text-center"
                  >
                    {t(item)}
                  </Link>
                ))}
                <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="text-white hover:text-purple-400"
                  >
                    English
                  </button>
                  <span className="text-white">/</span>
                  <button
                    onClick={() => changeLanguage("es")}
                    className="text-white hover:text-purple-400"
                  >
                    Español
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
