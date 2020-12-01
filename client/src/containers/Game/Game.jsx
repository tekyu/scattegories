import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TraversingLetter from "components/TraversingLetter/TraversingLetter";
import Results from "components/Results/Results";
import { categories, stage } from "store/room/roomSelectors";
import InputRow from "components/InputRow/InputRow";
import { socketActions } from "store/actions";
import Countdown from "components/Countdown/Countdown";
import Categories from "components/Categories/Categories";
import * as debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { readyForGame } from "../../store/game/gameActions";
import * as Styled from "./Game.styled";

const Game = () => {
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
  const setWaitingTimeHandler = ({ data: { time } }) => {
    console.log(`setWaitingTImeHandler`, time);
    setWaitingTimer(time);
  };

  const handleResize = event => {
    setAnswerWidth(getWidth(gameCategories));
    console.log(`resize`, window.innerWidth, getWidth(gameCategories));
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
    dispatch(socketActions.listener(`WAITING_TIME`, setWaitingTimeHandler));

    return () => {
      dispatch(
        socketActions.removeListener(`WAITING_TIME`, setWaitingTimeHandler)
      );
    };
  }, [dispatch]);

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
      {(roomStage === 2 || roomStage === 3) && (
        <InputRow answerWidth={answerWidth} categories={gameCategories} />
      )}
      <Results answerWidth={answerWidth} categories={gameCategories} />
    </Styled.Game>
  );
};

export default Game;
