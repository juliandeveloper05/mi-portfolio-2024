import React, { useEffect, useState } from "react";
import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { IconType } from "react-icons";
import Atropos from "atropos/react";
import { useTranslation } from "next-i18next";
import MagneticWrapper from "./magnetic-wrapper";

function loadCSS(href: string, condition: boolean) {
  if (condition) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

type ServiceCardProps = {
  Icon: IconType;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  Icon,
  title,
  description,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Establecer el ancho de la pantalla inicial

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Atropos
      className={`${windowWidth <= 768 ? "atropos-no-animation" : ""}`}
      shadow={windowWidth > 768}
    >
      <div className="atropos-inner">
        <div className="box">
          <span></span>
          <div className="content">
            <Icon size={48} />
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Atropos>
  );
};

const Services = () => {
  const { t } = useTranslation("services");

  return (
    <section
      id="services"
      className="flex flex-col justify-center min-h-[60em] bg-black"
    >
      <div className="container mx-auto px-4 mt-20 unselectable">
        <h2 className="text-3xl text-center text-white mb-12 text-pop">
          {t("services1")}
        </h2>
        <div className="servicesContainer grid grid-cols-1 gap-8 md:grid-cols-3">
          <ServiceCard
            Icon={FaCode}
            title={t("web_design.title")}
            description={t("web_design.description")}
          />

          <ServiceCard
            Icon={FaPaintBrush}
            title={t("ui_ux_design.title")}
            description={t("ui_ux_design.description")}
          />

          <ServiceCard
            Icon={FaMobileAlt}
            title={t("app_design.title")}
            description={t("app_design.description")}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
