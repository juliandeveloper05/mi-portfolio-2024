const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n,
  images: {
    domains: [
      "e-commerce-project-mp-2024-second.vercel.app",
      "juliansoto-portfolio.vercel.app",
    ],
  },
  env: {
    SENDGRID_SERVICE_NAME: "service_tad13cb",
    SENDGRID_TEMPLATE_NAME: "template_rh43gsm",
    SENDGRID_USER_KEY: "Yg5GEBfor_PC2rxqk",
  },
};

module.exports = nextConfig;
