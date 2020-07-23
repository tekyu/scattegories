import React from "react";
import { useSelector } from "react-redux";
import { roomSelectors } from "../../../store/selectors";
import * as Styled from "./Header.styled";
import Logo from "../../Logo/Logo";

const Header = () => {
  const roomId = useSelector(roomSelectors.id);
  return (
    <Styled.LogoContainer minified={!!roomId}>
      <Logo minified={!!roomId} />
    </Styled.LogoContainer>
  );
};

export default Header;
