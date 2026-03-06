import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[#12b886] to-transparent mb-4" />
      <h2 className="text-heading text-center font-semibold capitalize text-white unselectable">
        {children}
      </h2>
    </div>
  );
}
