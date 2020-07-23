import React from "react";
import RippedPaper from "../RippedPaper/RippedPaper";
import * as Styled from "./Player.styled";
import PostItNoteDynamic from "../PostItNoteDynamic/PostItNoteDynamic";

const Player = ({ id, username, state, score }) => {
  return (
    <PostItNoteDynamic rotate={1}>
      <Styled.Container id={id}>
        <Styled.StateIndicator>
          <Styled.State state={state} />
        </Styled.StateIndicator>
        <Styled.Username>{username}</Styled.Username>
        {score && <Styled.Score>{score}</Styled.Score>}
      </Styled.Container>
    </PostItNoteDynamic>
  );
};

export default React.memo(Player);
