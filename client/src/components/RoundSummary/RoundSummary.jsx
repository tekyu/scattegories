import React from "react";
import PropTypes from "prop-types";

import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import Countdown from "components/Countdown/Countdown";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { roomSelectors, userSelectors } from "store/selectors";
import * as Styled from "./RoundSummary.styled";
import { mockScoreboard, mockPlayers, mockId } from "./summaryMock";

const RoundSummary = (
  {
    // scoreboard = mockScoreboard,
    // players = mockPlayers,
    // myId = mockId,
    // activeRoundNumber = 0,
    // activeLetter = `i`,
    // nextRoundTimeout = 5000,
    // pointLimit = 1000
  }
) => {
  // scoreboard={scoreboard}
  // players={players}
  // myId={myId}
  // activeRoundNumber={activeRoundNumber}
  // activeLetter={activeLetter}
  // nextRoundTimeout={nextRoundTimeout}
  // pointLimit={maxScore}

  const scoreboard = useSelector(roomSelectors.scoreboard);
  const players = useSelector(roomSelectors.players);
  const myId = useSelector(userSelectors.id);
  const activeRoundNumber = useSelector(roomSelectors.roundNumber);
  const activeLetter = useSelector(roomSelectors.activeLetter);
  const nextRoundTimeout = useSelector(roomSelectors.nextRoundTimeout);
  const pointLimit = useSelector(roomSelectors.maxScore);

  const { t } = useTranslation();
  const content = () => {
    if (!scoreboard) {
      return <Styled.NoResults>No players</Styled.NoResults>;
    }
    const sortedPlayers = Object.entries(scoreboard)
      .map(([playerId, scores]) => {
        return {
          score: scores.finalPoints,
          id: playerId,
          pointsThisRound:
            scores &&
            scores.roundScores[activeLetter] &&
            scores.roundScores[activeLetter].roundPoints
        };
      })
      .sort((a, b) => {
        return b.score - a.score;
      });
    return sortedPlayers.map(({ score, id, pointsThisRound }, index) => {
      const username =
        players.find(({ id: playerId }) => {
          return id === playerId;
        }).username || `No user`;
      return (
        <Styled.Player key={id}>
          {id === myId && <Styled.Me>{t(`game.me`)}</Styled.Me>}
          <Styled.Username>
            <Styled.Index>{index + 1}</Styled.Index>
            {username}
          </Styled.Username>
          <Styled.Score>{score}</Styled.Score>
          {pointsThisRound > 0 ? (
            <Styled.ScoreThisRound>+{pointsThisRound}</Styled.ScoreThisRound>
          ) : null}
        </Styled.Player>
      );
    });
  };

  return (
    <Styled.RoundSummary>
      <PostItNoteDynamic
        padding="20px"
        rotate={(Math.random() * (-1 - 1.5) + 1).toFixed(2)}
      >
        <Styled.Header>
          <Styled.RoundInfo>
            <Styled.RoundNumber>Round {activeRoundNumber}</Styled.RoundNumber>
            <Styled.PointLimit>Point limit: {pointLimit}</Styled.PointLimit>
          </Styled.RoundInfo>
          <Styled.CountdownContainer>
            <Styled.CountdownText>Next in</Styled.CountdownText>
            <Countdown time={nextRoundTimeout} text="0" />
          </Styled.CountdownContainer>
        </Styled.Header>
        <Styled.Players>{content()}</Styled.Players>
      </PostItNoteDynamic>
    </Styled.RoundSummary>
  );
};

RoundSummary.propTypes = {
  scoreboard: PropTypes.object,
  players: PropTypes.array,
  myId: PropTypes.string,
  activeLetter: PropTypes.string,
  activeRoundNumber: PropTypes.number,
  nextRoundTimeout: PropTypes.number,
  pointLimit: PropTypes.number
};

RoundSummary.defaultProps = {};

export default RoundSummary;
