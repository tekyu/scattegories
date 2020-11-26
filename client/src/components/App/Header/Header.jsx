import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { roomSelectors } from "../../../store/selectors";
import * as Styled from "./Header.styled";
import Logo from "../../Logo/Logo";

const Header = () => {
  const { t } = useTranslation();
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
