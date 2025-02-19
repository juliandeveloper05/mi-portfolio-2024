import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import About from "@/components/About";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GrainEffect from "@/components/grain-effect";
import { Poppins } from "next/font/google";
import Approach from "@/components/Approach";
import Projects from "@/components/Projects";
import ScrollReveal from "@/components/scroll-reveal";
import WaterWaveWrapper from "@/components/WaterWaveWrapper";

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
        "timeline",
        "approach",
        "contact",
        "footer",
      ])),
    },
  };
}

const Home = () => {
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (initialLoadRef.current) {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      window.scrollTo(0, 0);
      initialLoadRef.current = false;
    }

    return () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black -z-30" />
      <div className="fixed inset-0 -z-20 w-full h-full">
        <GrainEffect />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <WaterWaveWrapper
          imageUrl="/assets/ocean-background.jpg"
          dropRadius={30}
          perturbance={0.04}
          resolution={512}
        >
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

              <ScrollReveal from="right" delay={0.3}>
                <section id="timeline" className="min-h-screen bg-transparent">
                  <Timeline />
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
        </WaterWaveWrapper>

        <footer className="relative z-10">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
