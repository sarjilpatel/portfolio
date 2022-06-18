import React from "react";
import {
  CTA,
  HeaderSocials,
  HeaderUpperSection,
  HeaderWrapper,
  MeImage,
  ScrollDown,
} from "./header";
import "./header.css";

function Header() {
  return (
    <header>
      <HeaderWrapper>
        <HeaderUpperSection />
        <CTA />
        <HeaderSocials />
        <MeImage />
        <ScrollDown />
      </HeaderWrapper>
    </header>
  );
}

export default Header;
