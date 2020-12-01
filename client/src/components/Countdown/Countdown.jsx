import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import * as Styled from "./Countdown.styled";

const Countdown = ({ time = 0, fontSize, text = `Starting` }) => {
  console.log(`[COUNTDOWN] time: ${time} | text: ${text}`);
  const [countdownTime, setCountdownTime] = useState(
    time !== 0 ? time / 1000 : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTime(prev => {
        return prev - 1;
      });
    }, 1000);

    if (countdownTime <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdownTime]);

  return (
    <Styled.Countdown fontSize={fontSize}>
      {countdownTime > 0 ? countdownTime : text}
    </Styled.Countdown>
  );
};

Countdown.propTypes = { time: PropTypes.number };

export default Countdown;
