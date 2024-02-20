import React from "react";
import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { IconType } from "react-icons";
import Atropos from "atropos/react";
import "atropos/atropos.css";

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
          <a href="#">Learn more</a>
        </div>
      </div>
    </div>
  </Atropos>
);

const Services = () => {
  return (
    <section
      id="services"
      className="flex flex-col justify-center min-h-[60em] bg-black"
    >
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-3xl text-center text-white mb-12 text-pop">
          My Services
        </h2>
        <div className="servicesContainer grid grid-cols-1 gap-8 md:grid-cols-3">
          <ServiceCard
            Icon={FaCode}
            title="Web Design"
            description="Crafting visually appealing and user-centric web designs using the latest technologies. My frontend expertise ensures responsive and dynamic user experiences."
          />
          <ServiceCard
            Icon={FaPaintBrush}
            title="UI/UX Design"
            description="Designing intuitive and impactful user interfaces by focusing on user experience principles. I aim to create seamless and engaging digital journeys."
          />
          <ServiceCard
            Icon={FaMobileAlt}
            title="App Design"
            description="Developing innovative app designs that combine functionality with aesthetics. My approach integrates modern design trends with user-friendly layouts."
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
