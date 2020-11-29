import React from "react";
import Menu from "components/Menu/Menu";
import InputRow from "components/InputRow/InputRow";
import ReadyButton from "components/ReadyButton/ReadyButton";
import * as Styled from "./Dashboard.styled";

const Dashboard = () => {
  return (
    <Styled.Dashboard>
      <InputRow />
      <ReadyButton />
      <Menu />
    </Styled.Dashboard>
  );
};

export default Dashboard;
