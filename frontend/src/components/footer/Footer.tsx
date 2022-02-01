import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/fuaberu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kevin Fabel
        </a>
      </p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9765f;
  color: #fff;
  a {
    font-size: 1.2rem;
    font-weight: 500;
    color: #6d6d6d;
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom-color: #fff;
    }
  }
`;

export default Footer;
