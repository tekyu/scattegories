import styled from "styled-components";

export const AccountBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin: 20px 0;
  height: auto;
  width: 100%;
`;

export const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: yellow;
  margin-bottom: 10px;
`;

export const Name = styled.h2`
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background: red;
  border-radius: 6px;
  padding: 7px 16px;
  border: 0;
  margin-bottom: 6px;
  cursor: pointer;
`;
