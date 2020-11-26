import React from "react";
import { useSelector } from "react-redux";
import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import PlayersCount from "components/PlayersCount/PlayersCount";
import { useTranslation } from "react-i18next";
import { roomSelectors } from "../../store/selectors";
import * as Styled from "./RoomInfo.styled";

const RoomInfo = () => {
  const { t } = useTranslation();
  const { playersMax, players, id, maxScore, categories } = useSelector(
    roomSelectors.room
  );
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
        <PostItNoteDynamic rotate={1.6}>{id}</PostItNoteDynamic>
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
