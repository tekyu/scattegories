import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./PlayersCount.styled";

const PlayersCount = ({ current = 0, max = 0 }) => {
  return (
    <Styled.PlayersCount>
      <Styled.Current current={current} max={max}>
        {current}
      </Styled.Current>
      <Styled.Divider>/</Styled.Divider>
      <Styled.Max>{max}</Styled.Max>
    </Styled.PlayersCount>
  );
};

PlayersCount.propTypes = {
  current: PropTypes.number,
  max: PropTypes.number.isRequired
};

export default PlayersCount;
