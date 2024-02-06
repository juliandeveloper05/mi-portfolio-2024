import React, { useEffect, useState } from "react";
import Transition from "../components/Transition"; // Asegúrate de que la ruta es correcta
import Navbar from "@/components/Navbar";
import Profile from "../components/Profile";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './font/ClashDisplay-Variable.ttf' })
// const myFont = localFont({ src: './font/Livemono-Regular.ttf' })

const Home = () => {
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
        <Navbar />
        <Profile />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
