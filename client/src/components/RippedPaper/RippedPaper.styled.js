import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 400px;
  margin: 40px auto;
  background: #fff;
  color: #000;
  font-family: "Covered By Your Grace", cursive;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  &:first-of-type {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const Paper = styled.div`
  height: auto;
  overflow: hidden;

  padding: ${({ padding }) => padding || `40px 60px`};
  background: rgba(255, 255, 136, 0.8);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  ${({ rotate }) =>
    rotate &&
    `
  transform: rotate(${rotate}deg);
`}
  /* background: linear-gradient(
    135deg,
    #ffff88 81%,
    #ffff88 82%,
    #ffff88 82%,
    #ffffc6 100%
  ); */

  &:before,
  &:after {
    content: "";
    height: 2px;
    position: absolute;
    left: 0;
    right: 0;
    clip-path: polygon(
      0% 0%,
      5% 100%,
      10% 0%,
      15% 100%,
      20% 0%,
      25% 100%,
      30% 0%,
      35% 100%,
      40% 0%,
      45% 100%,
      50% 0%,
      55% 100%,
      60% 0%,
      65% 100%,
      70% 0%,
      75% 100%,
      80% 0%,
      85% 100%,
      90% 0%,
      95% 100%,
      100% 0%
    );
  }
  &:before {
    background-color: #eee;
    top: 0;
  }
  &:after {
    background-color: #fff;
    bottom: -2px;
  }
`;

// .content-main {
//     position: relative;
//     width: 400px;
//     margin: 40px auto;

//     .content-box {
//       height: auto;
//       overflow: hidden;
//       padding: 20px;
//       background: $main-color;
//       box-shadow: 0 3px 5px rgba(0,0,0,0.05);

//       &:before, &:after {
//         content: ""; height: 2px;
//         position: absolute;
//         left: 0;
//         right: 0;
//         -webkit-clip-path: polygon(0% 0%, 5%  100%, 10% 0%, 15%  100%, 20% 0%, 25% 100%, 30% 0%, 35%  100%, 40% 0%, 45%  100%, 50% 0%, 55%  100%, 60% 0%, 65%  100%, 70% 0%, 75%  100%, 80% 0%, 85%  100%, 90% 0%, 95%  100%, 100% 0%);
//       }
//       &:before {
//         background-color: $bg-color;
//         top: 0;
//       }
//       &:after {
//         background-color: $main-color;
//         bottom: -2px;
//       }
//     }
//   }

export const Content = styled.div`
  ${({ rotate }) =>
    rotate &&
    `
  transform: rotate(${rotate}deg);
`}
`;
