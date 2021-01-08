import React from "react";
import Menu from "components/Menu/Menu";
import QuestionableAnswers from "components/QuestionableAnswers/QuestionableAnswers";
import * as Styled from "./Dashboard.styled";

const Dashboard = () => {
  return (
    <Styled.Dashboard>
      <Menu />
      <QuestionableAnswers />
    </Styled.Dashboard>
  );
};

export default Dashboard;
