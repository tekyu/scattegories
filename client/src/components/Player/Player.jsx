import React from "react";
import RippedPaper from "../RippedPaper/RippedPaper";
import * as Styled from "./Player.styled";
import PostItNoteDynamic from "../PostItNoteDynamic/PostItNoteDynamic";

const Player = ({ id, username, state, score, isYou }) => {
  return (
    <PostItNoteDynamic
      rotate={(Math.random() * (-1 - 2.5) + 2.5).toFixed(2)}
      backgroundReadyState={state}
    >
      <Styled.Container id={id} isYou={isYou}>
        {/* <Styled.StateIndicator>
          <Styled.State state={state} />
        </Styled.StateIndicator> */}
        <Styled.Username>{username}</Styled.Username>
        {score && <Styled.Score>{score}</Styled.Score>}
      </Styled.Container>
    </PostItNoteDynamic>
  );
};

export default React.memo(Player);
