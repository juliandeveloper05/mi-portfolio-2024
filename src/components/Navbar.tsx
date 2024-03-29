import React, { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";

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
    console.log(t('profile'))
  };

  return (
    <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
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
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "p-12 md:p-0 block" : "hidden"
            }`}
          >
            <ul className="h-screen md:h-auto items-center justify-center md:flex gap-1">
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
        </div>
        <div>
          <button onClick={() => changeLanguage("en")}>English</button>
          <button onClick={() => changeLanguage("es")}>Español</button>
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
        ${
          activeClass === "active"
            ? "md:border-b-1"
            : "md:border-b-0"
        }
      `}
    >
      <Link
        activeClass={activeClass}
        to={navItem}
        spy={true}
        smooth={true}
        duration={800}
        onClick={() => handleNavLinkClick(navItem)}
      >
        {t(navItem)}
      </Link>
    </li>
  );
};

export default NavBar;
