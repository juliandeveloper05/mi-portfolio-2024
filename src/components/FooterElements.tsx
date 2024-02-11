import Link from "next/link";
import styled from "styled-components";

export const Container = styled.footer`
  background-color: #101522;
  width: 100%;
  min-height: 70px;
  position: fixed;
  bottom: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
  margin: 1.2rem auto 0 auto;

  @media (max-width: 820px) {
    flex-direction: column;
  }
`;

export const Logo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  flex: 1;
`;

export const WebsiteRights = styled.small`
  color: #fff;
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 820px) {
    margin: 1rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  @media (max-width: 820px) {
    width: 80%;
  }
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 1.5rem;
  margin: 0 1rem;
`;
