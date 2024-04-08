import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const NavBar: React.FC = () => {
  const [navbar, setNavbar] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("home");
  const { t, i18n } = useTranslation("navbar");

  const handleNavLinkClick = (navItem: string) => {
    setNavbar(false);
    setSelectedNavItem(navItem);
  };

  const changeLanguage = (lang: string) => {
    console.log("Changing language to:", lang);
    i18n.changeLanguage(lang);
  };

  interface ButtonProps {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
  }

  const Button = ({ onClick, children }: ButtonProps) => (
    <motion.button
      onClick={onClick}
      className={`
  
      pb-2
      text-xl
    text-white
      py-2
      md:px-0
      text-center 
      px-1 
      rounded-full 
      bg-gradient-to-br  
     
      items-center
      justify-center
      "
      `}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.button>
  );

  return (
    <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
      <div className="justify-between mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div className="md:w-32 md:h-25">
          <div className="flex items-center justify-between py-3 md:py-5 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
            <Link to="#" href="/">
              <Image
                className="website-logo"
                src="/newlogo.png"
                alt="Logo"
                width={60}
                height={60}
              />
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <FiX size={30} /> : <FiMenu size={30} />}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex">
          <ul className="flex gap-6">
            <NavItem
              selectedNavItem={selectedNavItem}
              navItem="profile"
              handleNavLinkClick={handleNavLinkClick}
              t={t}
            />
            <NavItem
              selectedNavItem={selectedNavItem}
              navItem="about"
              handleNavLinkClick={handleNavLinkClick}
              t={t}
            />
            <NavItem
              selectedNavItem={selectedNavItem}
              navItem="services"
              handleNavLinkClick={handleNavLinkClick}
              t={t}
            />
            <NavItem
              selectedNavItem={selectedNavItem}
              navItem="contact"
              handleNavLinkClick={handleNavLinkClick}
              t={t}
            />
          </ul>
        </div>
        <div className="md:flex hidden">
          {/* Botones de cambio de idioma en vista de escritorio */}
          <div className="pb-2 flex items-center justify-center ">
            <Button onClick={() => changeLanguage("en")}>English</Button>/
            <Button onClick={() => changeLanguage("es")}>Español</Button>
          </div>
        </div>
        <div className="md:hidden">
          <div
            className={`fixed bg-black inset-0 z-10 overflow-y-auto flex flex-col items-center justify-center ${
              navbar ? "p-12 md:p-0 block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-end w-full mb-6">
                <button
                  className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(false)}
                >
                  <FiX size={30} />
                </button>
              </div>
              <div className="flex flex-grow justify-between">
                <ul className={`flex ${navbar ? "flex-col gap-6" : "gap-6"}`}>
                  <NavItem
                    selectedNavItem={selectedNavItem}
                    navItem="profile"
                    handleNavLinkClick={handleNavLinkClick}
                    t={t}
                  />
                  <NavItem
                    selectedNavItem={selectedNavItem}
                    navItem="about"
                    handleNavLinkClick={handleNavLinkClick}
                    t={t}
                  />
                  <NavItem
                    selectedNavItem={selectedNavItem}
                    navItem="services"
                    handleNavLinkClick={handleNavLinkClick}
                    t={t}
                  />
                  <NavItem
                    selectedNavItem={selectedNavItem}
                    navItem="contact"
                    handleNavLinkClick={handleNavLinkClick}
                    t={t}
                  />
                </ul>
              </div>
              {/* Botones de cambio de idioma en vista móvil */}
              {navbar && (
                <div className="pb-2 flex items-center justify-center">
                  <Button onClick={() => changeLanguage("en")}>English</Button>/
                  <Button onClick={() => changeLanguage("es")}>Español</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  selectedNavItem: string;
  navItem: string;
  handleNavLinkClick: (navItem: string) => void;
  t: (key: string) => string;
}

const NavItem: React.FC<NavItemProps> = ({
  selectedNavItem,
  navItem,
  handleNavLinkClick,
  t,
}) => {
  const activeClass = selectedNavItem === navItem ? "active" : "";

  return (
    <li
      className={`
        pb-2 
        text-xl 
        text-white 
        py-2 
        md:px-6 
        text-center 
        border-b-2 
        hover:bg-purple-800
        border-purple-800  
        md:hover:text-purple-400 
        md:hover:bg-transparent
        ${activeClass === "active" ? "md:border-b-1" : "md:border-b-0"}
      `}
    >
      <Link
        activeClass={activeClass}
        to={navItem}
        spy={true}
        smooth={true}
        duration={800}
        onClick={() => handleNavLinkClick(navItem)}
        offset={
          navItem === "profile"
            ? -20
            : navItem === "about"
            ? 20
            : navItem === "services"
            ? 230
            : 0
        }
      >
        {t(navItem)}
      </Link>
    </li>
  );
};

export default NavBar;
