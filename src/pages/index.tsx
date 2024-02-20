import React, { useEffect, useState, PropsWithChildren } from "react";
import Transition from "../components/Transition"; // Asegúrate de que la ruta es correcta
import Navbar from "@/components/Navbar";
import Profile from "../components/Profile";
import About from "../components/About";
import Services from "../components/Services";
import ContactPage from "../components/ContactPage";
import Footer from "../components/Footer";
import localFont from "next/font/local";
import { useRouter } from "next/router";

// Font files can be colocated inside of `pages`
// const myFont = localFont({ src: "./font/ClashDisplay-Variable.ttf" });
// const myFont = localFont({ src: './font/Livemono-Regular.ttf' })
import { Poppins } from 'next/font/google'

const myFont = Poppins({ 
  weight: '400',
  subsets: ['latin'] 
})

const Home = ({ children }: PropsWithChildren) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    // Configura el temporizador para que coincida con la duración de tu animación
    const totalAnimationTime = 3400;
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, totalAnimationTime); // Ajusta este tiempo según sea necesario

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showTransition && <Transition />}
      <main className={myFont.className}>
        {children}
        <Navbar />
        <Profile />
        <About />
        <Services />
        <ContactPage />
        <div className="mb-16"></div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
