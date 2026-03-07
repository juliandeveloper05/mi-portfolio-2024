import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "white-transparent-70": "rgba(255, 255, 255, 0.7)",
        "white-transparent-475": "rgba(255, 255, 255, 0.475)",
        "surface-1": "rgba(255, 255, 255, 0.03)",
        "surface-2": "rgba(255, 255, 255, 0.06)",
        "surface-3": "rgba(255, 255, 255, 0.10)",
      },
      backgroundImage: {
        grain: "url('/assets/images/background/noisy-background.png')",
      },
      animation: {
        "noisy-bg": "noise 1s steps(2) infinite",
        shimmer: "shimmer 2s linear infinite",
        "gradient-xy": "gradient-xy 5s ease infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        noise: {
          "0%": { transform: "translate3d(0, 9rem, 0)" },
          "10%": { transform: "translate3d(-1rem, -4rem, 0)" },
          "20%": { transform: "translate3d(-8rem, 2rem, 0)" },
          "30%": { transform: "translate3d(9rem, -9rem, 0)" },
          "40%": { transform: "translate3d(-2rem, 7rem, 0)" },
          "50%": { transform: "translate3d(-9rem, -4rem, 0)" },
          "60%": { transform: "translate3d(2rem, 6rem, 0)" },
          "70%": { transform: "translate3d(7rem, -8rem, 0)" },
          "80%": { transform: "translate3d(-9rem, 1rem, 0)" },
          "90%": { transform: "translate3d(6rem, -5rem, 0)" },
          to: { transform: "translate3d(-7rem, 0, 0)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "300% 300%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "1rem": "1rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "20": "5rem",
        "24": "6rem",
        "28": "7rem",
        "32": "8rem",
      },
      width: {
        "18": "4.5rem",
      },
      height: {
        "18": "4.5rem",
      },
      fontSize: {
        "2xl": "2rem",
        "display": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "subheading": ["clamp(1.125rem, 2vw, 1.5rem)", { lineHeight: "1.4" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.7" }],
      },
      zIndex: {
        "5": "5",
        "-10": "-10",
      },
      rotate: {
        "15deg": "15deg",
      },
      transitionDuration: {
        "600": "600ms",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.4, 0.0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropFilter: {
        none: "none",
        "5": "blur(5px)",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};

export default config;
