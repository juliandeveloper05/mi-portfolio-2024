// src/data/featured.ts

export interface FeaturedItem {
  title: string;
  logo: string;
  tag: string;
  video: string;
  credits: string;
  link: string;
}

export const featuredData: FeaturedItem[] = [
  {
    title: "MP Pantuflones",
    logo: "",
    tag: "Feb 2024",
    video: "/mp-pantuflones.mp4",
    credits: "E-commerce",
    link: "https://github.com/juliandeveloper05/e-commerce-project-mp-2024",
  },
  {
    title: "Portfolio 2024",
    logo: "",
    tag: "Feb 2024",
    video: "/portfolio-2024.mp4",
    credits: "Personal Portfolio",
    link: "https://github.com/juliandeveloper05/mi-portfolio-2024",
  },
];

// Usamos el primer ítem como el proyecto principal
export const MainFeatured = featuredData[0];
