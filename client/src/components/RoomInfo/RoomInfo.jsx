import React from "react";
import { useSelector } from "react-redux";
import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import PlayersCount from "components/PlayersCount/PlayersCount";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { roomSelectors } from "../../store/selectors";
import * as Styled from "./RoomInfo.styled";

const RoomInfo = () => {
  const { t } = useTranslation();
  const { playersMax, players, id, maxScore, categories } = useSelector(
    roomSelectors.room
  );

  const copyHandler = () => {
    console.log(`copied?`);
  };
  return (
    <Styled.RoomInfo>
      <Styled.RoomIdMessage>
        <Styled.RoomIdParagraph>
          {t(`waitingRoom.shareCode`)} {t(`waitingRoom.or`)}
          {` `}
          <Styled.RoomLink
            href={`http://localhost:3000/game/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(`waitingRoom.clickLink`)}
          </Styled.RoomLink>
        </Styled.RoomIdParagraph>
        <CopyToClipboard text={id} onCopy={copyHandler}>
          <PostItNoteDynamic rotate={1.6}>{id}</PostItNoteDynamic>
        </CopyToClipboard>
      </Styled.RoomIdMessage>
      <Styled.PlayersCountContainer>
        <Styled.PlayersCountLabel>
          {t(`waitingRoom.playersCount`)}
        </Styled.PlayersCountLabel>
        <PlayersCount current={players.length} max={playersMax} />
      </Styled.PlayersCountContainer>
      <p>
        {t(`waitingRoom.maxScore`)}: {maxScore}
      </p>
      <p>
        {t(`waitingRoom.categories`)}: {categories.join(`, `)}
      </p>
    </Styled.RoomInfo>
  );
};

export default RoomInfo;
