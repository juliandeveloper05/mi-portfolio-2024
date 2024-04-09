import { FC, ReactNode } from "react";
import SvgCurve from "./svg-curve";

interface HeadingProps {
  title_1: string;
  children?: ReactNode;
}

const Heading: FC<HeadingProps> = ({ title_1, children }) => {
  return (
    <div className="flex flex-col items-center -mt-46 sm:-mt-32">
      {" "}
      <div className="relative my-2 px-8 z-10">
        {" "}
        <div className="outline-none flex flex-col justify-start shrink-0 opacity-5 transform-top-32 2xl:-top-24 w-[71px] flex-none h-auto left-4 lg:left-12 absolute whitespace-pre"></div>
      </div>
      <div className="flex items-center flex-nowrap min-h-min overflow-hidden p-0 w-full font-oswald mb-2">
        {" "}
        <p className="text-[10vw] lg:text-[8vw] leading-[100%] text-primary-foreground mr-3">
          {title_1}
        </p>
      </div>
      {children}
      <SvgCurve />
    </div>
  );
};

export default Heading;
