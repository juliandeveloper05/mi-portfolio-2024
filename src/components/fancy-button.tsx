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
          py-2.5
          px-5
          md:py-3
          md:px-6
          flex
          items-center
          gap-2
          font-semibold
          text-sm
          md:text-base
          cursor-pointer
          transition-all
          duration-300
          text-white
        "
        onClick={onClick}
      >
        {icon}
        <span>{text}</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">
          <FaArrowRight className="text-xs" />
        </span>
      </div>
    </div>
  );
};

export default FancyButton;
