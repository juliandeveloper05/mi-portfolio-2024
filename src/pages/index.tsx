import Navbar from "@/components/Navbar";
import Profile from "../components/Profile/Profile";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <main>
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
