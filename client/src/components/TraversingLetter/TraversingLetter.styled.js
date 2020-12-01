import styled from "styled-components";
import theme from "assets/themes";

export const TraversingLetter = styled.div`
  color: #000;
  /* border: 2px solid #000; */
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  outline: none;
  /* box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2); */
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: solid 2px #41403e;
`;

export const Letter = styled.div`
  width: 30px;
  font-size: 60px;
  color: #000;
  font-family: "Covered By Your Grace";
  text-transform: uppercase;
`;
