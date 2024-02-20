import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";

function NavBar() {
  const navStyle = {
    backgroundColor: "#000000",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23222' stroke-width='10' %3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: "auto", // o el valor que necesites para que el patrón se repita correctamente
    backgroundRepeat: "repeat",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  };

  const [navbar, setNavbar] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("home");

  return (
    <div>
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link to="#" href="/">
                <Image
                  className="website-logo"
                  src="/newlogo.png"
                  alt="Logo"
                  width={60}
                  height={60}
                />
              </Link>

              {/* HAMBURGER BUTTON FOR MOBILE */}
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
                    selectedNavItem === "home"
                      ? "md:border-b-1"
                      : "md:border-b-0"
                  }
                `}
                >
                  <Link
                    activeClass="active"
                    to="profile"
                    spy={true}
                    smooth={true}
                    duration={800}
                    onClick={() => {
                      setNavbar(!navbar);
                      setSelectedNavItem("home");
                    }}
                  >
                    Home
                  </Link>
                </li>

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
                    selectedNavItem === "about"
                      ? "md:border-b-1"
                      : "md:border-b-0"
                  }
                `}
                >
                  <Link
                    activeClass="active"
                    to="about"
                    spy={true}
                    smooth={true}
                    duration={800}
                    onClick={() => {
                      setNavbar(!navbar);
                      setSelectedNavItem("about");
                    }}
                  >
                    About
                  </Link>
                </li>

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
                    selectedNavItem === "services"
                      ? "md:border-b-1"
                      : "md:border-b-0"
                  }
                `}
                >
                  <Link
                    activeClass="active"
                    to="services"
                    spy={true}
                    smooth={true}
                    duration={800}
                    onClick={() => {
                      setNavbar(!navbar);
                      setSelectedNavItem("services");
                    }}
                  >
                    Services
                  </Link>
                </li>

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
                    selectedNavItem === "contact"
                      ? "md:border-b-1"
                      : "md:border-b-0"
                  }
                `}
                >
                  <Link
                    activeClass="active"
                    to="contact"
                    spy={true}
                    smooth={true}
                    duration={800}
                    onClick={() => {
                      setNavbar(!navbar);
                      setSelectedNavItem("contact");
                    }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
