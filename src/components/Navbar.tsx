// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const FloatingNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const { t, i18n } = useTranslation("navbar");

  const navItems = [
    "profile",
    "about",
    "services",
    "projects",
    "approach",
    "contact",
  ];

  // Función para detectar qué sección está en vista
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item,
        element: document.getElementById(item),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          const offsetBottom = offsetTop + section.element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Llamada inicial para establecer la sección activa
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const handleNavLinkClick = (navItem: string) => {
    setIsOpen(false);
    setActiveSection(navItem);
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
                className={`text-white font-light tracking-wide cursor-pointer transition-colors 
                  ${
                    activeSection === item
                      ? "border-b border-white/50"
                      : "hover:text-white/70"
                  }
                  text-base capitalize`}
              >
                {t(item)}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLanguage("en")}
              className={`text-white font-light tracking-wide transition-colors px-2
                ${
                  router.locale === "en"
                    ? "border-b border-white/50"
                    : "hover:text-white/70"
                }`}
            >
              EN
            </button>
            <span className="text-white/50">/</span>
            <button
              onClick={() => changeLanguage("es")}
              className={`text-white font-light tracking-wide transition-colors px-2
                ${
                  router.locale === "es"
                    ? "border-b border-white/50"
                    : "hover:text-white/70"
                }`}
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
                    className={`text-white hover:text-white/70 text-center font-light tracking-wide capitalize
                      ${
                        activeSection === item ? "border-b border-white/50" : ""
                      }`}
                  >
                    {t(item)}
                  </Link>
                ))}
                <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="text-white hover:text-white/70 font-light tracking-wide"
                  >
                    English
                  </button>
                  <span className="text-white/50">/</span>
                  <button
                    onClick={() => changeLanguage("es")}
                    className="text-white hover:text-white/70 font-light tracking-wide"
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
