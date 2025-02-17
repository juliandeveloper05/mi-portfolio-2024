import { FC, ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const FancyButton: FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <div className="fancy-btn">
      <div
        className="
          group 
          bg-black 
          hover:bg-transparent 
          rounded-[108em]
          py-[1vw]
          px-[1vw]
          flex
          items-center
          gap-2
          font-bold
          text-1xl
          cursor-pointer
          transition-all
          duration-75
          text-white
        "
        onClick={onClick}
      >
        {icon}
        <span>{text}</span>
        <span className="group-hover:translate-x-[.23vw] transition-transform duration-100">
          <FaArrowRight />
        </span>
      </div>
    </div>
  );
};

export default FancyButton;
