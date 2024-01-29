// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      spacing: {
        "20": "5rem",
      },
      width: {
        "18": "4.5rem",
      },
      height: {
        "18": "4.5rem",
      },
      fontSize: {
        "2xl": "2rem",
      },
      zIndex: {
        "5": "5",
        "-10": "-10",
      },
      borderRadius: {
        "1rem": "1rem",
      },
      rotate: {
        "15deg": "15deg",
      },
      transitionDuration: {
        "600": "600ms",
      },
      backdropFilter: {
        none: "none",
        "5": "blur(5px)",
      },
      colors: {
        "white-transparent-70": "rgba(255, 255, 255, 0.7)",
        "white-transparent-475": "rgba(255, 255, 255, 0.475)",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};

export default config;
