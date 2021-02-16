import React, { useEffect, useState, useCallback, useRef } from "react";
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
import RoundSummary from "components/RoundSummary/RoundSummary";
import { gameSelectors, roomSelectors, userSelectors } from "store/selectors";
import GameSummary from "components/GameSummary/GameSummary";
import { readyForGame } from "../../store/game/gameActions";
import * as Styled from "./Game.styled";

const Game = () => {
  console.count(`[Game component]`);
  const { t } = useTranslation();
  // const mockcategories = [
  //   `Państwo`,
  //   `Miasto`,
  //   `Imię`,
  //   `Rzecz`,
  //   `Zwierze`,
  //   `Potrawa`,
  //   `Rośliny`
  // ];
  // const categoriesRef = useRef();
  const gameCategories = useSelector(categories);
  // const gameCategories = mockcategories;
  const getWidth = () => {
    const margin = 56 + 10 + 10 + 140;
    if (window.innerWidth >= 768) {
      console.log(
        `getWidth`,
        (window.innerWidth - margin) / (gameCategories.length || 1),
        window.innerWidth
      );
      return (window.innerWidth - margin) / (gameCategories.length || 1);
    }
    return 0;
  };

  const dispatch = useDispatch();
  const roomStage = useSelector(stage);
  const scoreboard = useSelector(roomSelectors.scoreboard);
  const players = useSelector(roomSelectors.players);
  const myId = useSelector(userSelectors.id);
  const activeRoundNumber = useSelector(roomSelectors.roundNumber);
  const activeLetter = useSelector(roomSelectors.activeLetter);
  const nextRoundTimeout = useSelector(roomSelectors.nextRoundTimeout);
  const maxScore = useSelector(roomSelectors.maxScore);
  const questionable = useSelector(gameSelectors.questionable);

  const [answerWidth, setAnswerWidth] = useState(getWidth());
  const [waitingTimer, setWaitingTimer] = useState(0);
  const [showInputRow, setShowInputRow] = useState(false);

  useEffect(() => {
    console.log(`jhfdsxncbfcbdfmvsdlkfhjsdlkvlsdv`, showInputRow);
  }, [showInputRow]);

  const setWaitingTimeHandler = ({ data: { time } }) => {
    setWaitingTimer(time);
  };

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
        return <QuestionableAnswers answers={questionable} />;
      case 6:
        return (
          <RoundSummary
            scoreboard={scoreboard}
            players={players}
            myId={myId}
            activeRoundNumber={activeRoundNumber}
            activeLetter={activeLetter}
            nextRoundTimeout={nextRoundTimeout}
            pointLimit={maxScore}
          />
        );
      case 7:
        return (
          <GameSummary scoreboard={scoreboard} players={players} myId={myId} />
        );
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
      {waitingTimer > 0 && <Countdown time={waitingTimer} text="0" />}
      <Styled.LetterContainer>
        <Styled.LetterText>{t(`game.currentLetter`)}</Styled.LetterText>
        <TraversingLetter />
      </Styled.LetterContainer>
      {/* <Categories
        ref={categories}
        answerWidth={answerWidth}
        categories={gameCategories}
      /> */}
      {/* <QuestionableAnswers /> */}
      {/* {showInputRow && ( */}
      <InputRow
        forceSubmitHandler={handleForcedSubmit}
        answerWidth={answerWidth}
        categories={gameCategories}
        showLetter={false}
        showInput={showInputRow}
      />
      {/* )} */}

      {gameContent()}
    </Styled.Game>
  );
};

export default Game;
