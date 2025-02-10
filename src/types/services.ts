import { IconType } from "react-icons";

export interface Technology {
  icon: IconType;
  name: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  technologies: Technology[];
}
