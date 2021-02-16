import themes from "assets/themes";
import styled from "styled-components";

export const AnswersCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

export const CategoryName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  color: ${themes.default.font.primary};
  margin-bottom: 30px;
`;
