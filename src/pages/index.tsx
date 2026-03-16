import React, { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import About from "@/components/About";
import Services from "@/components/Services";
import Timeline from "@/components/Timeline";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GrainEffect from "@/components/grain-effect";
import HeroBackground from "@/components/hero-background";
import Approach from "@/components/Approach";
import Testimonials from "@/components/Testimonials";
import Projects from "@/components/Projects";
import ScrollReveal from "@/components/scroll-reveal";
import { useAnalytics } from "@/hooks/useAnalytics";
import SceneWrapper from "@/components/3d/SceneWrapper";
import TerrainFallback2D from "@/components/3d/TerrainFallback2D";
import SkillsGlobeFallback2D from "@/components/3d/SkillsGlobeFallback2D";

const TerrainHeroCanvas = dynamic(() => import("@/components/3d/TerrainHero"), { ssr: false });
const SkillsGlobeCanvas = dynamic(() => import("@/components/3d/SkillsGlobe"), { ssr: false });

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
        "testimonials",
        "approach",
        "contact",
        "footer",
      ])),
    },
  };
}

const TRACKED_SECTIONS = ["profile", "about", "services", "projects", "timeline", "testimonials", "approach"];

const Home = () => {
  const initialLoadRef = useRef(true);
  const { trackEvent } = useAnalytics();
  const trackedSections = useRef(new Set<string>());

  const trackSections = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && !trackedSections.current.has(id)) {
            trackedSections.current.add(id);
            trackEvent("section_view", { section: id });
          }
        });
      },
      { threshold: 0.3 }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [trackEvent]);

  useEffect(() => {
    const cleanup = trackSections();
    return cleanup;
  }, [trackSections]);

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
      <div className="fixed inset-0 bg-[var(--theme-bg)] -z-30" />
      <div className="fixed inset-0 -z-20 w-full h-full" style={{ opacity: 'var(--theme-grain-opacity)' }}>
        <GrainEffect />
      </div>

      <div className="relative min-h-screen flex flex-col">
        <Navbar />

        <main className={`flex-grow relative z-10`}>
          <div className="relative">
            <section id="profile" className="bg-transparent relative">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <HeroBackground />
                <SceneWrapper
                  scene3D={<TerrainHeroCanvas />}
                  fallback2D={<TerrainFallback2D />}
                  className="absolute inset-0"
                />
              </div>
              <Profile />
            </section>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="about" className="bg-transparent">
                <About />
                <SceneWrapper
                  scene3D={<SkillsGlobeCanvas />}
                  fallback2D={<SkillsGlobeFallback2D />}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
                />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="services" className="bg-transparent">
                <Services />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="projects" className="bg-transparent">
                <Projects />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="timeline" className="bg-transparent">
                <Timeline />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="testimonials" className="bg-transparent">
                <Testimonials />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="approach" className="bg-transparent">
                <Approach />
              </section>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={0.2}>
              <section id="contact" className="bg-transparent">
                <ContactMe />
              </section>
            </ScrollReveal>
          </div>
        </main>

        <footer className="relative z-10">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Home;
