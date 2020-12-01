import styled from "styled-components";
import theme from "assets/themes";

export const Categories = styled.div`
  background: ${theme.default.paper};
  color: ${theme.default.font.primary};
  display: flex;
  padding: 10px 0;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 0;
  height: 100%;
  width: ${({ width }) => (width ? `${width}px` : `100px`)};
  margin: 0 4px;
  white-space: nowrap;
`;
