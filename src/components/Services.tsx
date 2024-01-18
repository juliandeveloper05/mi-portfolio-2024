import React from "react";
import { FaCode, FaMobileAlt, FaPaintBrush } from "react-icons/fa";
import { IconType } from "react-icons";

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
  <div className="group perspective">
    <div className="transform transition-transform duration-500 ease-in-out preserve-3d card-inner">
      <div className="flex flex-col items-center justify-center h-full p-6 text-white bg-gray-800 rounded-lg shadow-xl group-hover:rotate-y-10 group-hover:rotate-x-10">
        <Icon className="mb-2 text-4xl" />
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
        <a href="#" className="mt-4 text-sm text-gray-300 hover:underline">
          Learn more
        </a>
      </div>
    </div>
  </div>
);

const Services = () => {
  return (
    <section
      id="services"
      className="py-12 mt-20 flex justify-center items-center min-h-screen bg-black"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
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
