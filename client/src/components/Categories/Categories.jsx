import React from "react";
import PropTypes from "prop-types";

import Letter from "components/Letter/Letter";
import * as Styled from "./Categories.styled";

const Categories = ({ answerWidth = 100, categories = [] }) => {
  return (
    <Styled.Categories>
      {/* <Letter /> */}
      <Styled.CategoryHeader>
        {categories.map(category => (
          <Styled.Category key={`header-${category}`} width={answerWidth}>
            {category}
          </Styled.Category>
        ))}
      </Styled.CategoryHeader>
    </Styled.Categories>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  answerWidth: PropTypes.number
};

Categories.defaultProps = {
  answerWidth: 100,
  categories: []
};

export default Categories;
