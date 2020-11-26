import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import CreatableSelect from "react-select/creatable";
import { useField } from "formik";
import * as Styled from "./CategoriesMultiSelect.styled";

const components = {
  DropdownIndicator: null
};

const createOption = label => ({
  label,
  value: label
});
const CategoriesMultiSelect = ({
  name = `CategoriesMultiSelect`,
  initialValue = []
}) => {
  const [inputValue, setInputValue] = useState(``);
  const [field, meta, helpers] = useField(name);
  const [categories, setCategories] = useState(
    initialValue.map(val => createOption(val))
  );
  const { setValue, setTouched } = helpers;

  const handleChange = value => {
    setCategories(value);
    console.log(`handleChange`, value);
    setValue(value);
  };
  const handleInputChange = inputValue => {
    setInputValue(inputValue);
    setTouched(true);
  };
  const handleKeyDown = async event => {
    if (!inputValue) return;
    switch (event.key) {
      case `Enter`:
      case `Tab`:
        await setCategories(prev => {
          const newVal = [...prev, createOption(inputValue)];
          console.log(
            `handleKeyDown`,
            newVal,
            newVal.map(({ value }) => value)
          );
          return newVal;
        });
        setValue(categories.map(({ value }) => value));
        setInputValue(``);
        event.preventDefault();
        break;
      default:
    }
  };
  return (
    <Styled.CategoriesMultiSelect>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={categories}
      />
    </Styled.CategoriesMultiSelect>
  );
};

CategoriesMultiSelect.propTypes = {};

export default CategoriesMultiSelect;
