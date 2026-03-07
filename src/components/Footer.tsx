import React from "react";
import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation("footer");
  const numeroDeTelefono = "+5491130666369";
  const enlaceDeWhatsapp = `https://wa.me/${numeroDeTelefono}`;

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/full-stack-julian-soto/",
      icon: <BsLinkedin />,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/pale_codepunk0101/",
      icon: <BsInstagram />,
      label: "Instagram",
    },
    {
      href: enlaceDeWhatsapp,
      icon: <FaWhatsapp />,
      label: "WhatsApp",
    },
    {
      href: "https://www.youtube.com/channel/UCsn-cQZBBRDcIael-klPkJA",
      icon: <BsYoutube />,
      label: "YouTube",
    },
  ];

  return (
    <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-glass-bg)] backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            className="text-xl font-semibold text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors unselectable"
          >
            Julian Soto
          </Link>

          <div className="flex items-center gap-5">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] text-lg transition-all duration-300 hover:scale-110"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className="text-[var(--theme-text-muted)] text-sm unselectable">
            {t("footer1")} &copy; {t("footer2")} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
