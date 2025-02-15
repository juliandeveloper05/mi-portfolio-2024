// src/pages/index.tsx
import React, { PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import About from "@/components/About";
import Services from "@/components/Services";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GrainEffect from "@/components/grain-effect";
import { Poppins } from "next/font/google";
import Approach from "@/components/Approach";
import Projects from "@/components/Projects";
import ScrollReveal from "@/components/scroll-reveal";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "profile",
        "about",
        "services",
        "projects",
        "approach",
        "contact",
        "footer",
      ])),
    },
  };
}

const Home = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    // Al cargar o refrescar la página
    if (typeof window !== "undefined") {
      // Reemplazar el estado actual del historial con la URL base
      window.history.replaceState({}, "", "/");
      // Hacer scroll al inicio de la página
      window.scrollTo(0, 0);
    }
  }, []); // Se ejecuta solo al montar el componente

  return (
    <>
      {/* Fondo base negro fijo */}
      <div className="fixed inset-0 bg-black -z-30" />

      {/* Efecto de grano fijo */}
      <div className="fixed inset-0 -z-20 w-full h-full">
        <GrainEffect />
      </div>

      {/* Contenedor principal */}
      <div className="relative min-h-screen flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        {/* Contenido principal */}
        <main className={`${poppins.className} flex-grow relative z-10`}>
          <div className="relative">
            <ScrollReveal from="top" delay={0.2}>
              <section id="profile" className="min-h-screen bg-transparent">
                <Profile />
              </section>
            </ScrollReveal>

            <ScrollReveal from="right" delay={0.3}>
              <section id="about" className="min-h-screen bg-transparent">
                <About />
              </section>
            </ScrollReveal>

            <ScrollReveal from="left" delay={0.3}>
              <section id="services" className="min-h-screen bg-transparent">
                <Services />
              </section>
            </ScrollReveal>

            <ScrollReveal from="right" delay={0.3}>
              <section id="projects" className="min-h-screen bg-transparent">
                <Projects />
              </section>
            </ScrollReveal>

            <ScrollReveal from="left" delay={0.3}>
              <section id="approach" className="min-h-screen bg-transparent">
                <Approach />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.3}>
              <section id="contact" className="min-h-screen bg-transparent">
                <ContactMe />
              </section>
            </ScrollReveal>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
