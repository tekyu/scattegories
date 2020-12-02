import styled from "styled-components";

const stateObject = {
  0: `linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  );`,
  1: `linear-gradient(
    135deg,
    #ffff88 51%,
    #ffff88 52%,
    #d2f6c5 72%,
    #99f3bd 82%,
    #99f3bd 100%
  );`,
  2: `linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  );`
};

export const Container = styled.div`
  cursor: pointer;
  margin: 0 25px;
  ${({ rotate }) =>
    rotate &&
    `
    transform: rotate(${rotate}deg);
  `}
`;

export const Note = styled.div`
  line-height: 1;
  text-align: center;
  padding: 20px;
  margin: 25px;
  height: auto;
  /* padding-top: 20px;
  padding-bottom: 20px; */
  border: 1px solid #e8e8e8;
  /* border-top: 60px solid #fdfd86; */
  font-family: "Covered By Your Grace", cursive;
  color: #000;
  font-size: 3em;
  border-bottom-right-radius: 60px 5px;
  display: inline-block;
  position: relative;
  background: #ffff88; /* Old browsers */
  background: ${({ backgroundReadyState }) =>
    backgroundReadyState
      ? stateObject[backgroundReadyState]
      : `linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  );`};
  transition: all ease-in-out 0.3s;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    right: -0px;
    bottom: 20px;
    width: calc(100% - 25px);
    height: 25px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 2px 15px 5px rgba(0, 0, 0, 0.4);
    transform: matrix(-1, -0.1, 0, 1, 0, 0);
  }
`;
