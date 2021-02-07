import styled from "styled-components";
import themes from "assets/themes";

export const QuestionableAnswers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  padding: 20px;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: ${themes.default.background};
  transition: all 0.7s ease-in-out;
  left: -1000%;
  &.questionable-appear-active {
  }
  &.questionable-appear-done {
    left: 0;
  }
`;

export const Question = styled.h3`
  display: flex;
  flex-direction: column;
  font-size: 32px;
  color: ${themes.default.font.primary};
  margin-bottom: 20px;
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const CategoryName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: ${themes.default.font.primary};
`;

export const Wait = styled.div`
  font-size: 4rem;
  text-align: center;
  padding: 0 20px;
  color: ${themes.default.font.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  margin-top: 10vh;
  transition: opacity 1s ease-in-out;
  &.wait-appear-active {
  }
  &.wait-appear-done {
    opacity: 1;
    margin-top: 0;
  }
`;
