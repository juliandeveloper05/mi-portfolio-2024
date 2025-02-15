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
        grain: "url('/assets/images/background/noisy-background.png')",
      },
      animation: {
        "noisy-bg": "noise 1s steps(2) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        noise: {
          "0%": {
            transform: "translate3d(0, 9rem, 0)",
          },
          "10%": {
            transform: "translate3d(-1rem, -4rem, 0)",
          },
          "20%": {
            transform: "translate3d(-8rem, 2rem, 0)",
          },
          "30%": {
            transform: "translate3d(9rem, -9rem, 0)",
          },
          "40%": {
            transform: "translate3d(-2rem, 7rem, 0)",
          },
          "50%": {
            transform: "translate3d(-9rem, -4rem, 0)",
          },
          "60%": {
            transform: "translate3d(2rem, 6rem, 0)",
          },
          "70%": {
            transform: "translate3d(7rem, -8rem, 0)",
          },
          "80%": {
            transform: "translate3d(-9rem, 1rem, 0)",
          },
          "90%": {
            transform: "translate3d(6rem, -5rem, 0)",
          },
          to: {
            transform: "translate3d(-7rem, 0, 0)",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
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
