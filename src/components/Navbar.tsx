import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("home");

  return (
    <div>
      {/* <nav className="flex justify-between items-center py-6">
        <div className="text-2xl font-bold"></div>
        <ul className="flex gap-8 list-none text-lg">
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#about")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#services")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#projects")}
          ></li>
          <li
            className="cursor-pointer"
            onClick={() => navigateTo("#contact")}
          ></li>
        </ul>
      </nav> */}
      <nav className="w-full bg-black fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <Image className="website-logo" src="/newlogo.png" alt="Logo" width={60} height={60} />
              </Link>
              <Link href="/">
                <h2 className="text-2xl text-cyan-600 font-bold "> </h2>
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
                <li className={`
                  pb-2 
                  text-xl 
                  text-white 
                  py-2 
                  md:px-6 
                  text-center 
                  border-b-2 
                  hover:bg-purple-600  
                  border-purple-600  
                  md:hover:text-purple-400 
                  md:hover:bg-transparent
                  ${selectedNavItem === 'home' ? "md:border-b-1" : "md:border-b-0"}
                `}>
                  <Link href="#" onClick={() => { 
                    setNavbar(!navbar)
                    setSelectedNavItem('home')
                  }}>
                    Home
                  </Link>
                </li>

                <li className={`
                  pb-2 
                  text-xl 
                  text-white 
                  py-2 
                  md:px-6 
                  text-center 
                  border-b-2 
                  hover:bg-purple-600  
                  border-purple-600  
                  md:hover:text-purple-400 
                  md:hover:bg-transparent
                  ${selectedNavItem === 'about' ? "md:border-b-1" : "md:border-b-0"}
                `}>
                  <Link href="#about" onClick={() => { 
                    setNavbar(!navbar)
                    setSelectedNavItem('about')
                  }}>
                    About
                  </Link>
                </li>

                <li className={`
                  pb-2 
                  text-xl 
                  text-white 
                  py-2 
                  md:px-6 
                  text-center 
                  border-b-2 
                  hover:bg-purple-600  
                  border-purple-600  
                  md:hover:text-purple-400 
                  md:hover:bg-transparent
                  ${selectedNavItem === 'services' ? "md:border-b-1" : "md:border-b-0"}
                `}>
                  <Link href="#services" onClick={() => { 
                    setNavbar(!navbar)
                    setSelectedNavItem('services')
                  }}>
                    Services
                  </Link>
                </li>

                <li className={`
                  pb-2 
                  text-xl 
                  text-white 
                  py-2 
                  md:px-6 
                  text-center 
                  border-b-2 
                  hover:bg-purple-600  
                  border-purple-600  
                  md:hover:text-purple-400 
                  md:hover:bg-transparent
                  ${selectedNavItem === 'contact' ? "md:border-b-1" : "md:border-b-0"}
                `}>
                  <Link href="#contact" onClick={() => { 
                    setNavbar(!navbar)
                    setSelectedNavItem('contact')
                  }}>
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
