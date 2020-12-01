import styled from "styled-components";

export const Row = styled.div`
  color: #000;
  display: flex;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0;
  position: relative;
`;

export const Answers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Points = styled.div`
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.28);
  transform: rotate(0.1deg);
`;
