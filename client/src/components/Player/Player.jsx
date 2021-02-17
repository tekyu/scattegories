import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./Player.styled";
import PostItNoteDynamic from "../PostItNoteDynamic/PostItNoteDynamic";

const Player = ({ id, username, state, score, isYou }) => {
  return (
    <PostItNoteDynamic
      rotate={(Math.random() * (-1 - 2.5) + 2.5).toFixed(2)}
      backgroundReadyState={state}
    >
      <Styled.Container id={id} isYou={isYou}>
        <Styled.Username>{username}</Styled.Username>
        {score && <Styled.Score>{score}</Styled.Score>}
      </Styled.Container>
    </PostItNoteDynamic>
  );
};

Player.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  state: PropTypes.bool,
  score: PropTypes.number,
  isYou: PropTypes.bool
};

Player.defaultProps = {
  id: null,
  username: null,
  state: 0,
  score: null,
  isYou: false
};

export default React.memo(Player);
