import React from "react";
import { useSelector } from "react-redux";
import { roomSelectors } from "store/selectors";
import Logo from "components/Logo/Logo";
import * as Styled from "./Header.styled";

const Header = () => {
  const roomId = useSelector(roomSelectors.id);
  return (
    <Styled.Header>
      <Styled.LogoContainer minified={!!roomId}>
        <Logo minified={!!roomId} />
      </Styled.LogoContainer>
    </Styled.Header>
  );
};

export default Header;
