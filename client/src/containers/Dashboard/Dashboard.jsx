import React from "react";
import * as Styled from "./Dashboard.styled";
import Menu from "../../components/Menu/Menu";
import Player from "../../components/Player/Player";
import PlayersList from "../../components/PlayersList/PlayersList";

const Dashboard = () => {
  return (
    <Styled.Dashboard>
      <Menu />
    </Styled.Dashboard>
  );
};

export default Dashboard;
