import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import { useDispatch, useSelector } from "react-redux";
import { roomSelectors, userSelectors } from "store/selectors";
import { socketActions } from "store/actions";
import { useTranslation } from "react-i18next";
import * as Styled from "./GameSummary.styled";

const GameSummary = () => {
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const players = useSelector(roomSelectors.players);
  const myId = useSelector(userSelectors.id);

  const { t } = useTranslation();
  const [playAgain, setPlayAgain] = useState([]);
  const dispatch = useDispatch();
  const winners = useSelector(roomSelectors.winners);
  const sortedPlayers = Object.entries(scoreboard)
    .map(([playerId, scores]) => {
      return {
        score: scores.finalPoints,
        id: playerId
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    });
  const content = () => {
    if (!scoreboard) {
      return <Styled.NoResults>{t(`summary.noPlayers`)}</Styled.NoResults>;
    }

    return sortedPlayers.map(({ score, id }, index) => {
      const username =
        players.find(({ id: playerId }) => {
          return id === playerId;
        }).username || `${t(`summary.noPlayer`)}`;
      return (
        <Styled.Player key={id} playAgain={playAgain.some(pid => pid === id)}>
          {id === myId && <Styled.Me>{t(`game.me`)}</Styled.Me>}
          <Styled.Username>
            <Styled.Index>{index + 1}</Styled.Index>
            {username}
          </Styled.Username>
          <Styled.Score>{score}</Styled.Score>
        </Styled.Player>
      );
    });
  };

  const playAgainHandler = () => {
    dispatch(socketActions.emitter(`PLAY_AGAIN_SEND`));
  };

  const playAgainListenerHandler = players => {
    setPlayAgain(players);
  };

  useEffect(() => {
    dispatch(
      socketActions.listener(`PLAY_AGAIN_PLAYERS`, playAgainListenerHandler)
    );

    return () => {
      dispatch(
        socketActions.removeListener(
          `PLAY_AGAIN_PLAYERS`,
          playAgainListenerHandler
        )
      );
    };
  }, [dispatch]);

  return (
    <Styled.GameSummary>
      <PostItNoteDynamic
        padding="20px"
        rotate={(Math.random() * (-1 - 1.5) + 1).toFixed(2)}
      >
        <Styled.Header>
          <Styled.GameInfo>
            <Styled.GameText>{t(`summary.winnerIs`)}</Styled.GameText>
            <Styled.Winner>
              {winners[0] ? winners[0].username : `test username`}
            </Styled.Winner>
          </Styled.GameInfo>
        </Styled.Header>
        <Styled.Players>{content()}</Styled.Players>
        <Styled.Footer>
          <Styled.PlayAgain onClick={playAgainHandler}>
            {t(`summary.playAgain`)}
          </Styled.PlayAgain>
          <Styled.PlayersCount>
            {playAgain.length}/{players.length}
          </Styled.PlayersCount>
        </Styled.Footer>
      </PostItNoteDynamic>
    </Styled.GameSummary>
  );
};

GameSummary.propTypes = {};

GameSummary.defaultProps = {};

export default GameSummary;
