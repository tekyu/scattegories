import styled from "styled-components";

export const Answer = styled.div`
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
