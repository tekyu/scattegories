import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Styled from "./Logo.styled";

const Logo = ({ minified }) => {
  const { t } = useTranslation();
  return (
    <Link to="/">
      <Styled.Logo minified={minified}>{t(`logo`)}</Styled.Logo>
    </Link>
  );
};

export default Logo;
