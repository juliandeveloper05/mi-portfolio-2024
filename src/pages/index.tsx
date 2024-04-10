/* eslint-disable react/no-children-prop */
import React, { useEffect, useState, PropsWithChildren } from "react";
import Transition from "../components/Transition"; // Asegúrate de que la ruta es correcta
import Navbar from "@/components/Navbar";
import Profile from "../components/Profile";
import About from "../components/About";
import Services from "../components/Services";
import ContactMe from "@/components/ContactMe";
import Footer from "../components/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18next from "i18next";
import GrainEffect from "../components/grain-effect";
// Font files can be colocated inside of `pages`
// const myFont = localFont({ src: "./font/ClashDisplay-Variable.ttf" });
// const myFont = localFont({ src: './font/Livemono-Regular.ttf' })
import { Poppins } from "next/font/google";

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
      ])),
    },
  };
}

const Home = ({ children }: PropsWithChildren) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const totalAnimationTime = 3400;
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, totalAnimationTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/*() => <div className="h-screen"></div>*/}

      {showTransition && <Transition />}

      <main className={myFont.className}>
        {children}
        <div style={{ zIndex: 5 }}>
          <GrainEffect children={undefined} />
        </div>
        <div style={{ zIndex: 5 }}>
          {" "}
          <Navbar />
        </div>

        <Profile initialTime={new Date()} />
        <About />
        <Services />
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
