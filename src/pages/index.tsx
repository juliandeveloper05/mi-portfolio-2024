import React, { PropsWithChildren } from "react";
import Navbar from "@/components/Navbar";
import Profile from "../components/Profile";
import About from "../components/About";
import Services from "../components/Services";
import ContactMe from "@/components/ContactMe";
import Footer from "../components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GrainEffect from "../components/grain-effect";
import { Poppins } from "next/font/google";
import Approach from "@/components/Approach";
import Projects from "../components/Projects";

const myFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export async function getStaticProps({ locale }: { locale: any }) {
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
  return (
    <div>
      <main className={myFont.className}>
        {children}
        <div style={{ zIndex: 5 }}>
          <GrainEffect />
        </div>
        <div style={{ zIndex: 5 }}>
          <Navbar />
        </div>

        <Profile />
        <About />
        <Services />
        <Projects />
        <Approach />
        <ContactMe />

        <div className="mb-16"></div>
        <div style={{ zIndex: -10 }}>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
