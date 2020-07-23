import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Menu.styled";
import PostItNote from "../PostItNote/PostItNote";

const Menu = () => {
  return (
    <Styled.Menu>
      <Link to="/create">
        <PostItNote rotate={-4}>Stwórz nową grę</PostItNote>
      </Link>
      <Link to="/join">
        <PostItNote rotate={10}>Dołącz do gry</PostItNote>
      </Link>
    </Styled.Menu>
  );
};

export default Menu;
