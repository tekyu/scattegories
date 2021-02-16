import React, { useState } from "react";
import { useSelector } from "react-redux";
import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import PlayersCount from "components/PlayersCount/PlayersCount";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { roomSelectors } from "../../store/selectors";
import * as Styled from "./RoomInfo.styled";

const RoomInfo = () => {
  const { t } = useTranslation();
  const [idCopied, setIdCopied] = useState(false);
  const { playersMax, players, id, maxScore, categories } = useSelector(
    roomSelectors.room
  );

  const copyHandler = () => {
    setIdCopied(true);
    setTimeout(() => {
      setIdCopied(false);
    }, 1500);
  };
  return (
    <Styled.RoomInfo>
      <Styled.RoomIdMessage>
        <PostItNoteDynamic margin="0px" rotate={1.6}>
          <Styled.RoomIdParagraph>
            {t(`waitingRoom.shareCode`)}
            {/* <Styled.RoomLink
            href={`http://localhost:3000/game/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          > */}
            {/* {t(`waitingRoom.clickLink`)} */}
            {/* </Styled.RoomLink> */}
          </Styled.RoomIdParagraph>
          <CopyToClipboard text={id} onCopy={copyHandler}>
            <Styled.CopyButton copied={idCopied}>{id}</Styled.CopyButton>
          </CopyToClipboard>
        </PostItNoteDynamic>
      </Styled.RoomIdMessage>
      <Styled.Info>
        <Styled.Row>
          <Styled.PlayersCountContainer>
            <Styled.PlayersCountLabel>
              {t(`waitingRoom.playersCount`)}
            </Styled.PlayersCountLabel>
            <PlayersCount current={players.length} max={playersMax} />
          </Styled.PlayersCountContainer>
          <Styled.MaxScore>
            {t(`waitingRoom.maxScore`)}: {maxScore}
          </Styled.MaxScore>
        </Styled.Row>
        <Styled.CategoriesContainer>
          <Styled.CategoriesHeader>
            {t(`waitingRoom.categories`)}
          </Styled.CategoriesHeader>
          <Styled.CategoriesPipsContainer>
            {categories.map(category => (
              <Styled.CategoryPip
                rotate={(Math.random() * (-1 - 2.5) + 2.5).toFixed(2)}
                key={category}
              >
                {category}
              </Styled.CategoryPip>
            ))}
          </Styled.CategoriesPipsContainer>
        </Styled.CategoriesContainer>
      </Styled.Info>
    </Styled.RoomInfo>
  );
};

export default RoomInfo;
