import styled from "styled-components";

export const Results = styled.div`
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Covered By Your Grace";
`;

export const Row = styled.div`
  color: #000;
  display: flex;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0;
  position: relative;
  /* &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 10px;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    border-bottom: solid 2px #41403e;
    bottom: 0;
    left: 0;
  } */
`;

export const Letter = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  font-family: "Covered By Your Grace";
  font-size: 34px;
  text-transform: uppercase;
`;

export const Answers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Answer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 0;
  height: 100%;
  width: 140px;
  margin: 0 4px;
  white-space: nowrap;
`;

export const AnswerText = styled.div`
  text-align: center;
  width: 100%;
  font-size: 18px;
  margin: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Points = styled.div`
  color: #000;
  display: flex;
  position: absolute;
  bottom: -5px;
  right: 5px;
  font-size: 20px;
  transform: rotate(5deg);
`;

export const Header = styled.div`
  color: #000;
  display: flex;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.28);
  transform: rotate(0.1deg);
`;
