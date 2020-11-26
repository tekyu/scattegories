import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import * as Styled from "./TraversingLetter.styled";
import { gameActions, socketActions } from "../../store/actions";

const TraversingLetter = () => {
  const dispatch = useDispatch();
  const [activeLetter, setActiveLetter] = useState(``);
  const [letterFromServer, setLetterFromServer] = useState(``);
  const [traversing, setTraversing] = useState(false);
  const letters = [
    `a`,
    `b`,
    `c`,
    `d`,
    `e`,
    `f`,
    `g`,
    `h`,
    `i`,
    `j`,
    `k`,
    `l`,
    `m`,
    `n`,
    `o`,
    `p`,
    `q`,
    `r`,
    `s`,
    `t`,
    `u`,
    `v`,
    `w`,
    `x`,
    `y`,
    `z`
  ];

  const roundLetterReceived = useCallback(
    ({ data: { letter } }) => {
      setTraversing(false);
      setLetterFromServer(letter);
      dispatch(gameActions.updateActiveLetter(letter));
    },
    [dispatch]
  );

  const resetLetterTraversing = useCallback(() => {
    setTraversing(true);
    setLetterFromServer(``);
    dispatch(gameActions.updateActiveLetter(``));
  }, [dispatch]);

  useEffect(() => {
    dispatch(socketActions.listener(`ROUND_LETTER`, roundLetterReceived));
    dispatch(socketActions.listener(`STARTING_ROUND`, resetLetterTraversing));

    return () => {
      dispatch(
        socketActions.removeListener(`ROUND_LETTER`, roundLetterReceived)
      );
      dispatch(
        socketActions.removeListener(`STARTING_ROUND`, resetLetterTraversing)
      );
    };
  }, [dispatch, resetLetterTraversing, roundLetterReceived]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLetter(prevLetter => {
        const random = Math.floor(Math.random() * (letters.length - 0 + 1)) + 0;
        return letters[random];
      });
    }, 80);

    if (!traversing) {
      clearInterval(interval);
    }

    if (letterFromServer) {
      setActiveLetter(letterFromServer);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeLetter, letterFromServer, letters, traversing]);

  return (
    <Styled.TraversingLetter>
      <Styled.Letter>{activeLetter}</Styled.Letter>
    </Styled.TraversingLetter>
  );
};

TraversingLetter.propTypes = {};

export default TraversingLetter;
