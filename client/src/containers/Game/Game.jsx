import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import TraversingLetter from "components/TraversingLetter/TraversingLetter";
import Results from "components/Results/Results";
import { categories, stage } from "store/room/roomSelectors";
import InputRow from "components/InputRow/InputRow";
import { gameActions, socketActions } from "store/actions";
import Countdown from "components/Countdown/Countdown";
import Categories from "components/Categories/Categories";
import * as debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import QuestionableAnswers from "components/QuestionableAnswers/QuestionableAnswers";
import { readyForGame } from "../../store/game/gameActions";
import * as Styled from "./Game.styled";

const Game = () => {
  console.count(`[Game component]`);
  const { t } = useTranslation();
  const mockcategories = [
    `Państwo`,
    `Miasto`,
    `Imię`,
    `Rzecz`,
    `Zwierze`,
    `Potrawa`,
    `Rośliny`
  ];
  const gameCategories = useSelector(categories);
  // const gameCategories = mockcategories;
  const getWidth = (categories = []) =>
    (window.innerWidth - 160) / (categories.length || 1);

  const dispatch = useDispatch();
  const roomStage = useSelector(stage);
  const [answerWidth, setAnswerWidth] = useState(getWidth(gameCategories));
  const [waitingTimer, setWaitingTimer] = useState(0);
  const [showInputRow, setShowInputRow] = useState(false);

  const setWaitingTimeHandler = ({ data: { time } }) => {
    console.log(`setWaitingTImeHandler`, time);
    setWaitingTimer(time);
  };

  const updateQuestionableAnswers = useCallback(
    ({ data }) => {
      console.log(`[game][updateQuestionableAnswers]`, data);
      dispatch(gameActions.updateQuestionableAnswers(data));
    },
    [dispatch]
  );

  const handleResize = event => {
    setAnswerWidth(getWidth(gameCategories));
    console.log(`resize`, window.innerWidth, getWidth(gameCategories));
  };

  const handleForcedSubmit = () => {
    setShowInputRow(true);
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
    dispatch(socketActions.listener(`WAITING_TIME`, setWaitingTimeHandler));

    return () => {
      dispatch(
        socketActions.removeListener(`WAITING_TIME`, setWaitingTimeHandler)
      );
    };
  }, [dispatch]);

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

  useEffect(() => {
    console.log(`stage change`, roomStage);
  }, [roomStage]);

  const gameContent = () => {
    switch (roomStage) {
      case 1:
      case 2:
      case 3:
      case 4:
        return (
          <Results answerWidth={answerWidth} categories={gameCategories} />
        );
      case 5:
        return <QuestionableAnswers />;
      default:
        return (
          <Results answerWidth={answerWidth} categories={gameCategories} />
        );
    }
  };

  useEffect(() => {
    dispatch(readyForGame());
  }, [dispatch]);
  return (
    <Styled.Game>
      {waitingTimer > 0 && (
        <Countdown time={waitingTimer} text="Round ending" />
      )}
      <Styled.LetterContainer>
        <Styled.LetterText>{t(`game.currentLetter`)}</Styled.LetterText>
        <TraversingLetter />
      </Styled.LetterContainer>
      <Categories answerWidth={answerWidth} categories={gameCategories} />
      {/* <QuestionableAnswers /> */}
      {showInputRow && (
        <InputRow
          forceSubmitHandler={handleForcedSubmit}
          answerWidth={answerWidth}
          categories={gameCategories}
        />
      )}

      {gameContent()}
    </Styled.Game>
  );
};

export default Game;
