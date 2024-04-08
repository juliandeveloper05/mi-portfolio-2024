import { FC, ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

interface ButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

const FancyButton: FC<ButtonProps> = ({ text, icon, onClick, children }) => {
  return (
    <a className="fancy-btn" onClick={onClick}>
      <div
        className="
      group 
      bg-black 
      hover:bg-transparent 
      text-primary-foreground 
      hover:text-black
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
      "
      >
        {children}
        <span>{text}</span>
        <span
          className="
        group-hover:translate-x-[.23vw] 
        transition-transform 
        duration-100
        "
        >
          <FaArrowRight />
        </span>
      </div>
    </a>
  );
};

export default FancyButton;
