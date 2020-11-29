import styled from "styled-components";
import { Field } from "formik";

export const InputRow = styled.div`
  background: yellow;
`;

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

export const InputContainer = styled.div`
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

export const InputField = styled(Field)`
  width: 100%;
  margin: 0 2px;
`;
