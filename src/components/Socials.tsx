import React from "react";
import {
  RiYoutubeFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";
import Link from "next/link";

interface Icon {
  path: string;
  name: JSX.Element;
  external?: boolean;
}

const icons: Icon[] = [
  {
    path: "https://www.youtube.com/channel/UCsn-cQZBBRDcIael-klPkJA/",
    name: <RiYoutubeFill />,
    external: true,
  },
  {
    path: "https://github.com/juliandeveloper05",
    name: <RiGithubFill />,
    external: true,
  },
  {
    path: "https://www.facebook.com/paalecode/?locale=es_LA",
    name: <RiFacebookFill />,
    external: true,
  },
  {
    path: "https://www.instagram.com/pale_codepunk0101/",
    name: <RiInstagramFill />,
    external: true,
  },
];

interface SocialsProps {
  containerStyles: string;
  iconsStyles: string;
}

const Socials: React.FC<SocialsProps> = ({ containerStyles, iconsStyles }) => {
  const hoverEffect = "transition-transform transform hover:rotate-0";

  return (
    <div className={containerStyles}>
      {icons.map((icon, index) => {
        const IconElement = React.cloneElement(icon.name, {
          className: `${iconsStyles} `,
          key: index,
        });

        return icon.external ? (
          <a
            href={icon.path}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {IconElement}
          </a>
        ) : (
          <Link href={icon.path} key={index}>
            <a>{IconElement}</a>{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
