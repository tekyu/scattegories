import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { InputRow } from "components/InputRow/InputRow.styled";
import Letter from "components/Letter/Letter";
import * as Styled from "./Results.styled";

const Results = () => {
  const categories = [
    `Państwo`,
    `Miasto`,
    `Imię`,
    `Rzecz`,
    `Zwierze`,
    `Potrawa`,
    `Rośliny`
  ];
  const getWidth = (categories = []) =>
    (window.innerWidth - 160) / (categories.length || 1);

  const [answerWidth, setAnswerWidth] = useState(getWidth(categories));

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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  const handleResize = event => {
    setAnswerWidth(getWidth(categories));
    console.log(`resize`, window.innerWidth, getWidth(categories));
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

  const renderRows = () => {
    return mockResults.map(({ letter, answers }) => {
      return (
        <>
          <Styled.Row key={letter}>
            <Letter letter={letter} />
            <Styled.Answers>
              {answers.map(({ category, answer, points }) => {
                return (
                  <Styled.Answer key={category} width={answerWidth}>
                    <Styled.AnswerText>{answer}</Styled.AnswerText>
                    <Styled.Points>{points}</Styled.Points>
                  </Styled.Answer>
                );
              })}
            </Styled.Answers>
          </Styled.Row>
          <Styled.Divider key={`${letter}-divider`} />
        </>
      );
    });
  };

  return (
    <Styled.Results>
      <Styled.Header>
        <Styled.Row>
          <Letter />
          <Styled.Answers>
            {categories.map(category => (
              <Styled.Answer key={category} width={answerWidth}>
                {category}
              </Styled.Answer>
            ))}
          </Styled.Answers>
        </Styled.Row>
      </Styled.Header>
      {renderRows()}
    </Styled.Results>
  );
};

Results.propTypes = {};

export default Results;
