import React from "react";
import * as Styled from "./Account.styled";

const Account = () => {
  return (
    <Styled.AccountBox>
      <Styled.Icon />
      <Styled.Name>Guest4538</Styled.Name>
      <Styled.Button>Login</Styled.Button>
      <Styled.Button>Sign up</Styled.Button>
    </Styled.AccountBox>
  );
};

export default Account;
