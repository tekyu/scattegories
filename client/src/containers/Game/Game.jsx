import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TraversingLetter from "components/TraversingLetter/TraversingLetter";
import Results from "components/Results/Results";
import { categories, stage } from "store/room/roomSelectors";
import InputRow from "components/InputRow/InputRow";
import { gameActions, socketActions } from "store/actions";
import Countdown from "components/Countdown/Countdown";
import * as debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import QuestionableAnswers from "components/QuestionableAnswers/QuestionableAnswers";
import RoundSummary from "components/RoundSummary/RoundSummary";
import { gameSelectors } from "store/selectors";
import GameSummary from "components/GameSummary/GameSummary";
import { readyForGame } from "../../store/game/gameActions";
import * as Styled from "./Game.styled";

const Game = () => {
  console.count(`[Game component]`);
  const { t } = useTranslation();
  const gameCategories = useSelector(categories);
  // const gameCategories = mockcategories;
  const getWidth = () => {
    const margin = 56 + 10 + 10 + 140 + 140;
    if (window.innerWidth >= 768) {
      return (window.innerWidth - margin) / (gameCategories.length || 1);
    }
    return 0;
  };

  const dispatch = useDispatch();
  const roomStage = useSelector(stage);
  const questionable = useSelector(gameSelectors.questionable);

  const [answerWidth, setAnswerWidth] = useState(getWidth());
  const [showInputRow, setShowInputRow] = useState(false);

  const updateQuestionableAnswers = useCallback(
    ({ data }) => {
      dispatch(gameActions.updateQuestionableAnswers(data));
    },
    [dispatch]
  );

  const handleResize = () => {
    setAnswerWidth(getWidth().toFixed(2));
  };

  const handleForcedSubmit = () => {
    setShowInputRow(false);
  };

  useEffect(() => {
    window.addEventListener(
      `resize`,
      debounce(handleResize, 300, {
        leading: false,
        trailing: true
      })
    );

    return () => {
      window.removeEventListener(
        `resize`,
        debounce(handleResize, 300, {
          leading: true,
          trailing: true
        })
      );
    };
  });

  useEffect(() => {
    if (roomStage === 2 || roomStage === 3) {
      setShowInputRow(true);
    } else {
      setShowInputRow(false);
    }
  }, [roomStage, showInputRow]);

  useEffect(() => {
    dispatch(
      socketActions.listener(`QUESTIONABLE_ANSWERS`, updateQuestionableAnswers)
    );

    return () => {
      dispatch(
        socketActions.removeListener(
          `QUESTIONABLE_ANSWERS`,
          updateQuestionableAnswers
        )
      );
    };
  }, [dispatch, updateQuestionableAnswers]);

  const gameContent = () => {
    switch (roomStage) {
      case 1:
      case 2:
      case 3:
      case 4:
        return <Results answerWidth={answerWidth} />;
      case 5:
        return <QuestionableAnswers answers={questionable} />;
      case 6:
        return <RoundSummary />;
      case 7:
        return <GameSummary />;
      default:
        return <Results answerWidth={answerWidth} />;
    }
  };

  useEffect(() => {
    dispatch(readyForGame());
  }, [dispatch]);

  return (
    <Styled.Game>
      {roomStage === 3 && (
        <Styled.RoundEnding>
          <Styled.RoundEndingText>
            {t(`game.roundEnding`)}
          </Styled.RoundEndingText>
          <Countdown time={5000} text={t(`game.now`)} />
        </Styled.RoundEnding>
      )}
      <Styled.LetterContainer>
        <Styled.LetterText>{t(`game.currentLetter`)}</Styled.LetterText>
        <TraversingLetter />
      </Styled.LetterContainer>
      <InputRow
        forceSubmitHandler={handleForcedSubmit}
        answerWidth={answerWidth}
        categories={gameCategories}
        showLetter={false}
        showInput={showInputRow}
      />
      {gameContent()}
    </Styled.Game>
  );
};

export default Game;
