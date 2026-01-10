import { IconType } from "react-icons";

export interface Technology {
  icon: IconType;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  technologies: Technology[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  gradient: string;
}

export interface ProjectCardProps {
  project: Project;
  onHover?: (id: number | null) => void;
  isHovered?: boolean;
}
