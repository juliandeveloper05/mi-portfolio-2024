import React from "react";
import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { IconType } from "react-icons";
import Atropos from "atropos/react";
import "atropos/atropos.css";
import { useTranslation } from "next-i18next";

type ServiceCardProps = {
  Icon: IconType;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  Icon,
  title,
  description,
}) => (
  <Atropos className="my-atropos" shadow={false}>
    <div className="atropos-inner">
      <div className="box">
        <span></span>
        <div className="content">
          <h2>{title}</h2>
          <p>{description}</p>
          {/*<a href="#">Learn more</a>*/}
        </div>
      </div>
    </div>
  </Atropos>
);

const Services = () => {
  const { t } = useTranslation("services");
  return (
    <section
      id="services"
      className="flex flex-col justify-center min-h-[60em] bg-black"
    >
      <div className="container mx-auto px-4 mt-20">
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
