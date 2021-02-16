import React from "react";
import PropTypes from "prop-types";
import AnswerRow from "components/AnswerRow/AnswerRow";
import { useSelector } from "react-redux";
import { myScoreboard } from "store/game/gameSelectors";
import { useTranslation } from "react-i18next";
import * as Styled from "./Results.styled";

const Results = ({ answerWidth = 100 }) => {
  const myGameScoreboard = useSelector(myScoreboard);
  const { t } = useTranslation();

  const renderRows = () => {
    return myGameScoreboard && myGameScoreboard.roundScores ? (
      Object.entries(myGameScoreboard.roundScores)
        .map(([letter, round]) => {
          return { ...round, letter };
        })
        .sort((a, b) => a.roundNumber - b.roundNumber)
        .map(({ letter, answers, roundPoints }) => {
          return (
            <AnswerRow
              key={letter}
              answers={answers}
              letter={letter}
              roundPoints={roundPoints}
              answerWidth={answerWidth}
            />
          );
        })
    ) : (
        <Styled.NoResults>{t(`game.noResults`)}</Styled.NoResults>
      );
  };

  return (
    <Styled.Results>
      <Styled.Previous>{t(`game.previousRounds`)}</Styled.Previous>
      {renderRows()}
    </Styled.Results>
  );
};

Results.propTypes = {
  answerWidth: PropTypes.number
};

Results.defaultProps = {
  answerWidth: 100
};

export default Results;
