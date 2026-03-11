import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  "profile",
  "about",
  "services",
  "projects",
  "timeline",
  "testimonials",
  "approach",
  "contact",
];

const FloatingNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const { t, i18n } = useTranslation("navbar");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const offset = windowHeight * 0.3;

      const sections = NAV_ITEMS
        .map((item) => {
          const element = document.getElementById(item);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item,
              top: rect.top + scrollPosition,
              bottom: rect.bottom + scrollPosition,
            };
          }
          return null;
        })
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.top - offset) {
          setActiveSection(section.id);
          break;
        }
      }

      const bottomOfPage =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100;
      if (bottomOfPage) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 mx-auto z-50 px-4 md:px-0"
      >
        <div className="unselectable flex justify-between items-center max-w-4xl mx-auto px-4 md:px-6 py-2.5 rounded-full bg-[var(--theme-nav-bg)] backdrop-blur-md border border-[var(--theme-border)] shadow-lg shadow-[var(--theme-shadow)]">
          <Link
            to="profile"
            spy={true}
            smooth={true}
            duration={800}
            className="cursor-pointer"
          >
            <Image
              src="/newlogo.png"
              alt="Logo"
              width={36}
              height={36}
              className="website-logo"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                to={item}
                spy={true}
                smooth={true}
                duration={800}
                offset={-100}
                onClick={() => handleNavLinkClick(item)}
                className={`relative text-sm font-light tracking-wide cursor-pointer transition-colors px-2 py-1.5 rounded-full capitalize whitespace-nowrap
                  ${
                    activeSection === item
                      ? "text-[var(--theme-text)]"
                      : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)]"
                  }`}
              >
                {t(item)}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--theme-accent)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <div className="w-px h-4 bg-[var(--theme-border)] mx-1" />
            <button
              onClick={() => changeLanguage("en")}
              className={`text-xs font-medium tracking-wide transition-all px-2.5 py-1 rounded-full
                ${
                  router.locale === "en"
                    ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]"
                }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`text-xs font-medium tracking-wide transition-all px-2.5 py-1 rounded-full
                ${
                  router.locale === "es"
                    ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                    : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]"
                }`}
            >
              ES
            </button>
          </div>

          <button
            className="md:hidden text-[var(--theme-text-secondary)] p-2 hover:text-[var(--theme-text)] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 mt-2 p-6 md:hidden rounded-2xl shadow-2xl mx-4 bg-[var(--theme-glass-bg)] backdrop-blur-xl border border-[var(--theme-border)]"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    to={item}
                    spy={true}
                    smooth={true}
                    duration={800}
                    offset={-100}
                    onClick={() => handleNavLinkClick(item)}
                    className={`py-2.5 px-4 rounded-lg text-center font-light tracking-wide capitalize transition-all
                      ${
                        activeSection === item
                          ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/5"
                          : "text-[var(--theme-text-secondary)] hover:text-[var(--theme-text)] hover:bg-[var(--theme-surface-2)]"
                      }`}
                  >
                    {t(item)}
                  </Link>
                ))}

                <div className="flex justify-center items-center gap-3 pt-4 mt-2 border-t border-[var(--theme-border)]">
                  <ThemeToggle />
                  <div className="w-px h-4 bg-[var(--theme-border)]" />
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        router.locale === "en"
                          ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                          : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]"
                      }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("es")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        router.locale === "es"
                          ? "text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                          : "text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]"
                      }`}
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
