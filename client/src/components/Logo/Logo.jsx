import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Logo.styled";

const Logo = ({ minified }) => {
  return (
    <Link to="/">
      <Styled.Logo minified={minified}>Państwa miasta</Styled.Logo>
    </Link>
  );
};

export default Logo;
