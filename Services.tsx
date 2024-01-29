// Importaciones necesarias
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
      <div
        className="flex flex-col items-center justify-center h-full p-6 rounded-lg shadow-xl"
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid orange",
        }}
      >
        <div
          style={{
            backgroundColor: "orange",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon className="text-4xl text-black" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
        <a href="#" className="mt-4 text-sm hover:underline">
          Learn more
        </a>
      </div>
    </div>
  </Atropos>
);

const Services = () => {
  return (
    <section
      id="services"
      className="py-12 mt-20 flex justify-center items-center min-h-screen bg-black"
    >
      <div className="container mx-auto px-4 mt-20">
        <h2
          className="text-3xl text-center text-white mb-12 text-pop"
          style={{ fontFamily: '"Press Start 2P", cursive' }}
        >
          My Services
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
