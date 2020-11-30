import React from "react";
import Menu from "components/Menu/Menu";
import InputField from "components/InputRow/InputRow";
import * as Styled from "./Dashboard.styled";

const Dashboard = () => {
  return (
    <Styled.Dashboard>
      <InputField />
      <Menu />
    </Styled.Dashboard>
  );
};

export default Dashboard;
