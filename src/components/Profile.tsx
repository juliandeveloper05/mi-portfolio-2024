import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import DigitalClock from "./DigitalClock";

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
interface ProfileProps {
  initialTime: Date;
}
const Profile: React.FC<ProfileProps> = ({ initialTime }) => {
  const { t } = useTranslation("profile");
  const router = useRouter();

  const navigateTo = (path: Url) => {
    router.push(path);
  };

  return (
    <>
      <section
        id="profile"
        className="
          min-h-screen
          flex
          flex-col
          md:flex-row
          justify-center
          items-center
          my-4
          md:mt-1
        "
      >
        <div className="flex w-max sm:w-2/4 justify-center sm:justify-center md:justify-end">
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
            xl:h-[450px]
            relative
            shadow-lg
            profile-image
            
          "
          >
            <Image
              src="/profile-2.jpg"
              alt="Imagen de perfil"
              layout="fill"
              className="object-cover "
            />
          </div>
        </div>
        <div className="flex sm:w-2/4 justify-center sm:justify-center md:justify-start sm:ml-6">
          <div className="text-center mt-4 md:mt-8 w-max sm:w-full md:w-full lg:w-2/3 flex flex-col gap-3">
            <HelloText className="mb-2">{t("hello_text")}</HelloText>
            <div className="flex w-full justify-center text-center">
              <h1 className="typewriter-name text-4xl md:text-6xl font-bold palenque-style">
                Julian Soto
              </h1>
            </div>
            <ProfessionalText className="my-2 text-pop">
              {t("professional_text")}
            </ProfessionalText>

            <div className="flex flex-col w-full justify-center gap-4">
              <div className="flex justify-center gap-2">
                <button
                  className="
                    px-1
                    py-1
                    sm:w-fit
                    rounded-full
                    bg-gradient-to-br
                    from-green-500
                    via-teal-500
                    to-blue-500
                    hover:bg-slate-700
                    text-white
                    transition-transform
                    duration-300
                    transform
                    hover:scale-105
                  "
                  onClick={() =>
                    window.open(
                      "/25 EN ESPAÑOL CV ACTUALIZADO 2024 CON FOTO NUEVA.pdf"
                    )
                  }
                >
                  <span className="block bg-[#121212] hover:bg—slate-800 rounded-full px-5 py-2">
                    {t("button1")}
                  </span>
                </button>
                <button
                  className="px-6
                    py-3
                    sm:w-fit
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    hover:bg-slate-200
                    text-white
                    transition-transform
                    duration-300
                    transform
                    hover:scale-105
                  "
                  onClick={() => navigateTo("#contact")}
                >
                  <span> {t("button2")}</span>
                </button>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/full-stack-julian-soto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <FaLinkedin size={30} />
                </a>
                <a
                  href="https://github.com/juliandeveloper05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <FaGithub size={30} />
                </a>
              </div>
            </div>
            <div className="mt-1 flex justify-center">
              <DigitalClock initialTime={initialTime} />
            </div>
            <div className="flex justify-center gap-4 mt-4"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
