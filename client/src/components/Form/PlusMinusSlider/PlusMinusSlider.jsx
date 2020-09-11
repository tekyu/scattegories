import React, { useEffect } from "react";
import { useState } from "react";
import { useField } from "formik";
import * as Styled from "./PlusMinusSlider.styled";

const PlusMinusSlider = ({
  name = "PlusMinusSlider",
  initialValue = null,
  minValue = 0,
  maxValue = 10,
  step = 1,
  maxWidth = 100
}) => {
  const avgValue = initialValue || (maxValue - minValue) / 2;

  const [sliderValue, setSliderValue] = useState(avgValue);
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const { value } = meta;
  useEffect(() => {
    setValue(sliderValue);
  }, [sliderValue]);

  const inputHandler = ({ target }) => {
    const valueAsNumber = +target.value;
    setSliderValue(valueAsNumber);
    setTouched(true);
  };

  const blurHandler = ({ target }) => {
    const valueAsNumber = +target.value;
    if (valueAsNumber > maxValue) {
      setSliderValue(maxValue);
    } else if (valueAsNumber < minValue) {
      setSliderValue(minValue);
    } else {
      setSliderValue(valueAsNumber);
    }
    setTouched(true);
  };

  const buttonHandler = ({ target }) => {
    const direction = target.getAttribute("direction");
    switch (direction) {
      case "decrease":
        setSliderValue(previousValue => {
          return previousValue - step >= minValue
            ? previousValue - step
            : minValue;
        });
        break;
      case "increase":
        setSliderValue(previousValue => {
          return previousValue + step >= maxValue
            ? maxValue
            : previousValue + step;
        });
        break;
      default:
        break;
    }
  };

  return (
    <Styled.Slider>
      <Styled.Minus type="button" onClick={buttonHandler} direction="decrease">
        -
      </Styled.Minus>
      <Styled.Input
        maxWidth={maxWidth}
        min={minValue}
        max={maxValue}
        type="tel"
        value={sliderValue}
        onChange={inputHandler}
        onBlur={blurHandler}
      />
      <Styled.Plus type="button" onClick={buttonHandler} direction="increase">
        +
      </Styled.Plus>
    </Styled.Slider>
  );
};

export default PlusMinusSlider;
