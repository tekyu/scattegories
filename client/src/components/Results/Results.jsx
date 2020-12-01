import React from "react";
import PropTypes from "prop-types";
import Letter from "components/Letter/Letter";
import AnswerRow from "components/AnswerRow/AnswerRow";
import Answer from "components/Answer/Answer";
import * as Styled from "./Results.styled";

const Results = ({ categories = [], answerWidth = 100 }) => {
  console.count(`[INPUTROW]`);

  const mockResults = [
    {
      letter: `k`,
      answers: [
        { category: categories[0], answer: `ter`, points: 5 },
        { category: categories[1], answer: `testr`, points: 10 },
        { category: categories[2], answer: `tes`, points: 10 },
        { category: categories[3], answer: ``, points: 0 },
        { category: categories[4], answer: `test answer`, points: 5 },
        { category: categories[5], answer: `test adfsfsdnswer`, points: 5 },
        { category: categories[6], answer: `test adfsfsdnswer`, points: 5 }
      ],
      roundPoints: 40
    },
    {
      letter: `g`,
      answers: [
        { category: categories[0], answer: `test answer`, points: 5 },
        { category: categories[1], answer: `test answer`, points: 10 },
        { category: categories[2], answer: `test answer`, points: 10 },
        { category: categories[3], answer: ``, points: 0 },
        { category: categories[4], answer: `test answer`, points: 5 },
        { category: categories[5], answer: `test ansdfsfdswer`, points: 5 },
        { category: categories[6], answer: `test adfsfsdnswer`, points: 5 }
      ],
      roundPoints: 40
    },
    {
      letter: `b`,
      answers: [
        { category: categories[0], answer: `test answer`, points: 5 },
        {
          category: categories[1],
          answer: `test anasdsadsadasdswer`,
          points: 10
        },
        { category: categories[2], answer: `test answer`, points: 10 },
        { category: categories[3], answer: ``, points: 0 },
        { category: categories[4], answer: `tessdf st answer`, points: 5 },
        { category: categories[5], answer: `test answer`, points: 5 },
        { category: categories[6], answer: `test adfsfsdnswer`, points: 5 }
      ],
      roundPoints: 40
    },
    {
      letter: `c`,
      answers: [
        { category: categories[0], answer: `test answer`, points: 5 },
        { category: categories[1], answer: `test andsfsdfswer`, points: 10 },
        { category: categories[2], answer: `test answer`, points: 10 },
        { category: categories[3], answer: ``, points: 0 },
        { category: categories[4], answer: `tessd sdt answer`, points: 5 },
        { category: categories[5], answer: `test answer`, points: 5 },
        { category: categories[6], answer: `test adfsfsdnswer`, points: 5 }
      ],
      roundPoints: 40
    }
  ];

  const renderRows = () => {
    return mockResults.map(({ letter, answers, roundPoints }) => {
      return (
        <Styled.Row key={letter}>
          <Letter letter={letter} />
          <Styled.Answers>
            {answers.map(({ category, answer, points }) => {
              return (
                <AnswerRow
                  key={`${letter}-${category}`}
                  category={category}
                  answer={answer}
                  points={points}
                  width={answerWidth}
                  roundPoints={roundPoints}
                />
              );
            })}
          </Styled.Answers>
          <Styled.Points>{roundPoints}</Styled.Points>
        </Styled.Row>
      );
    });
  };

  return <Styled.Results>{renderRows()}</Styled.Results>;
};

Results.propTypes = {
  categories: PropTypes.array,
  answerWidth: PropTypes.number
};

Results.defaultProps = {
  answerWidth: 100,
  categories: []
};

export default Results;
