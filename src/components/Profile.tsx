import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import FancyButton from "./fancy-button";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Skeleton from "./skeleton";

const Profile = () => {
  const { t } = useTranslation("profile");
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownloadCV = () => {
    const locale = router.locale === 'es' ? 'es' : 'en';
    window.open(`/api/resume?locale=${locale}`, '_blank');
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="
        min-h-screen
        flex
        flex-col
        md:flex-row
        justify-center
        items-center
        py-20
        md:py-0
        unselectable
        relative
        z-10
      "
    >
      {/* Left Column - Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full md:w-1/2 justify-center md:justify-end"
      >
        <div
          className="
            rounded-2xl
            overflow-hidden
            w-48
            h-48
            md:w-80
            md:h-80
            lg:w-96
            lg:h-96
            relative
            shadow-lg
            profile-image
            border border-[var(--theme-border)]
          "
        >
          {!imageLoaded && <Skeleton className="absolute inset-0" />}
          <Image
            src="/profile-2.jpg"
            alt="Julian Soto - Profile"
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            fill
            sizes="(max-width: 768px) 192px, (max-width: 1024px) 320px, 384px"
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </motion.div>

      {/* Right Column - Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex w-full md:w-1/2 justify-center md:justify-start md:ml-8"
      >
        <div
          className="
            text-center
            md:text-left
            mt-8
            md:mt-0
            w-full
            lg:w-11/12
            xl:w-2/3
            flex
            flex-col
            gap-4
            px-6
            md:px-0
          "
        >
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm md:text-base font-light uppercase tracking-[0.5em] text-[var(--theme-text-secondary)]"
          >
            {t("hello_text")}
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-display font-bold text-[var(--theme-text)]"
          >
            Julian Soto
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-subheading font-semibold uppercase tracking-wider text-[var(--theme-accent)]"
          >
            {t("professional_text")}
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-body-lg text-[var(--theme-text-secondary)] leading-relaxed max-w-md mx-auto md:mx-0"
          >
            {t("subtitle")}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col w-full gap-4 mt-2"
          >
            <div className="flex justify-center md:justify-start gap-3">
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
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center md:justify-start gap-4 mt-2"
            >
              <a
                href="https://www.linkedin.com/in/full-stack-julian-soto/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/juliandeveloper05"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon hover:scale-110 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
