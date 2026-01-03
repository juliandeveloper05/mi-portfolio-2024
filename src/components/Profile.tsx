import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import FancyButton from "./fancy-button";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const HelloText = styled.p`
  font-family: "Montserrat", Sans-serif;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 12px;
`;

const ProfessionalText = styled.p`
  font-size: 22px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const SubtitleText = styled.p`
  font-family: "Montserrat", Sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.75rem;
  padding: 0 1rem;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 14px;
    letter-spacing: 1px;
    padding: 0;
    max-width: none;
  }
`;

const Profile = () => {
  const { t } = useTranslation("profile");
  const router = useRouter();

  const handleDownloadCV = () => {
    const cvFile = router.locale === 'es' ? '/cv_español.pdf' : '/cv_ingles.pdf';
    window.open(cvFile);
  };

  return (
    <motion.section
      id="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
        min-h-screen
        flex
        flex-col
        md:flex-row
        justify-center
        items-center
        my-4
        md:mt-3
        unselectable
        relative
        z-10
      "
    >
      {/* Left Column - Profile Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex w-max sm:w-2/4 justify-center sm:justify-center md:justify-end"
      >
        <div
          className="
          rounded-full
          overflow-hidden
          w-[200px]
          h-[200px]
          md:w-[400px]
          md:h-[400px]
          lg:w-[500px]
          lg:h-[500px]
          xl:w-[450px]
          xl:h-[470px]
          relative
          shadow-lg
          profile-image
        "
        >
          <Image
            src="/profile-2.jpg"
            alt="Imagen de perfil"
            className="object-cover"
            width={500}
            height={500}
            priority
          />
        </div>
      </motion.div>

      {/* Right Column - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex sm:w-2/4 justify-center sm:justify-center md:justify-start sm:ml-6"
      >
        <div
          className="
          text-center
          mt-4
          md:mt-8
          w-max
          sm:w-full
          md:w-full
          lg:w-2/3
          flex
          flex-col
          gap-3
        "
        >
          <HelloText className="mb-2">{t("hello_text")}</HelloText>

          <div className="flex w-full justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className="typewriter-name text-4xl md:text-6xl font-bold palenque-style"
            >
              Julian Soto
            </motion.h1>
          </div>

          <ProfessionalText className="my-2 text-pop">
            {t("professional_text")}
          </ProfessionalText>

          <SubtitleText>
            {t("subtitle")}
          </SubtitleText>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col w-full justify-center gap-4"
          >
            <div className="flex justify-center gap-2">
              <FancyButton text={t("button1")} onClick={handleDownloadCV} />

              <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={800}
                offset={-98}
                className="cursor-pointer"
              >
                <FancyButton text={t("button2")} />
              </Link>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-center gap-4 mt-4"
            >
              <a
                href="https://www.linkedin.com/in/full-stack-julian-soto/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:scale-110 transition-transform duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="https://github.com/juliandeveloper05"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:scale-110 transition-transform duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={30} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Profile;
