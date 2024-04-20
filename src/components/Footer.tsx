import React from "react";
import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import {
  Container,
  Logo,
  SocialIconLink,
  SocialIcons,
  WebsiteRights,
  Wrapper,
} from "./FooterElements";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");
  const numeroDeTelefono = "+5491130666369";

  const enlaceDeWhatsapp = `https://wa.me/${numeroDeTelefono}`;

  return (
    <Container
      style={{
        backgroundColor: "black",
        height: "5px",
        boxShadow: "0px 0px 10px 5px rgba(255, 255, 255, 0.3)",
      }}
    >
      <Wrapper>
        <Logo className="text-pop unselectable" href="/">
          Julian Soto
        </Logo>

        <WebsiteRights className="unselectable">
          {t("footer1")} &copy; {t("footer2")} {""}
          {new Date().getFullYear()}
        </WebsiteRights>

        <SocialIcons>
          <SocialIconLink
            href="https://www.linkedin.com/in/full-stack-julian-soto/"
            target="_blank"
            aria-label="Linkedin"
            className="text-pop"
          >
            <BsLinkedin />
          </SocialIconLink>
          <SocialIconLink
            href="https://www.instagram.com/pale_codepunk0101/"
            target="_blank"
            aria-label="Instagram"
            className="text-pop"
          >
            <BsInstagram />
          </SocialIconLink>
          <SocialIconLink
            href={enlaceDeWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pop"
          >
            <FaWhatsapp />
          </SocialIconLink>
          <SocialIconLink
            href="https://www.youtube.com/channel/UCsn-cQZBBRDcIael-klPkJA"
            target="_blank"
            aria-label="Youtube"
            className="text-pop"
          >
            <BsYoutube />
          </SocialIconLink>
        </SocialIcons>
      </Wrapper>
    </Container>
  );
};

export default Footer;
