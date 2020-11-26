import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Styled from "./Menu.styled";
import PostItNote from "../PostItNote/PostItNote";

const Menu = () => {
  const { t } = useTranslation();
  return (
    <Styled.Menu>
      <Link to="/create">
        <PostItNote rotate={-4}>{t(`navigation.create`)}</PostItNote>
      </Link>
      <Link to="/join">
        <PostItNote rotate={10}>{t(`navigation.join`)}</PostItNote>
      </Link>
    </Styled.Menu>
  );
};

export default Menu;
