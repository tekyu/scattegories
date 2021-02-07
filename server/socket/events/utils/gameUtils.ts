import cloneDeep from 'clone-deep';
import { nanoid } from 'nanoid';

export const roundEntry = ({ id, answers }) => {
  return {
    playerId: id,
    answers,
    roundPoints: 0,
  };
};

export const emptyRound = ({ letter }) => {
  return {
    letter,
    entries: [],
    id: nanoid(),
  };
};


export const getNewLetter = (letters) => {
  const newLetters = cloneDeep(letters);
  const { letter, index } = getRandomLetter(newLetters);
  if (index > -1) {
    letters.splice(index, 1);
  }
  return { letters, letter };
};


export const getRandomLetter = (alphabet = '') => {
  const min = 0;
  const max = alphabet.length;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return { letter: alphabet[random], index: random };
};

export const createScoreboard = players => players.reduce((acc, { id }) => {
  acc[id] = { roundScores: {}, finalPoints: 0 };
  return acc;
}, {});
// export const getInitialAnswersArray = (categories) => {
//   console.log('[getInitialAnswersArray]', categories);
//   return categories.reduce((initial, category) => {
//     console.log('[getInitialAnswersArray][REDUCE]', initial, category);
//     initial[category] = [];
//     return initial;
//   }, {});
// };

export const getAllAnswers = (entries) => {
  return (
    entries.reduce((answers, entry) => {
      Object.entries(entry.answers).forEach(([category, answer]) => {
        console.log(category, answer);
        answers.push({
          answer,
          playerId: entry.playerId,
          answerId: nanoid(6),
          category
        });
      });
      return answers;
    }, [])
  )
};

export const getSortedAnswers = (allAnswers) => {
  const questionable = [];
  const pointable = allAnswers.filter((v1, i1, self) => {
    const ndx = self.findIndex(function (v2, i2) {
      // make sure not looking at the same object (using index to verify)
      // use JSON.stringify for object comparison
      console.log(
        `i1 ${i1} i2 ${i2}`,
        v1.answer,
        v2.answer,
        v1.answer == v2.answer
      );
      return v1.answer && v2.answer && i1 != i2 && v1.answer === v2.answer && v1.category === v2.category;
    });
    console.log(`TU? i1 ${i1} ndx ${ndx}`, v1);
    if (i1 != ndx && ndx === -1 && v1.answer) {
      console.log('NO DUPE', v1);
      questionable.push(v1);
    }
    return i1 != ndx && ndx != -1;
  });
  return { pointable, questionable, allAnswers };
};

export const getSortedAllAnswers = async ({
  entries = [],
}) => {
  const allAnswers = getAllAnswers(entries);
  console.log('[getSortedAllAnswers][allAnswers]', allAnswers);
  return getSortedAnswers(allAnswers);
};

export const getActiveRound = ({ rounds, activeLetter }) => {
  return rounds.find(
    ({ letter }) => letter === activeLetter
  );
}

/**
 * 
 * @param entries Object
 * @returns Object [answerId] : { num }
 */
export const getNumbersOfVotePerAnswer = (entries) => Object.values(entries).reduce((acc, entry) => {
  Object.entries(entry).forEach(([entry, { allow }]) => {
    if (!acc[entry]) {
      acc[entry] = { num: 0 }
    }
    acc[entry].num += allow === 'yes' ? 1 : 0
  });
  return acc
}, {})

/**
 * 
 * @param numOfPlayers number
 * @param entries Object
 * @returns Object [answerId] : { percentage }
 */
export const getPercentage = (numOfPlayers, entries) => Object.entries(getNumbersOfVotePerAnswer(entries)).reduce((acc, [answer, { num }]: Array<any>) => {
  if (!acc[answer]) {
    acc[answer] = { percentage: 0 };
  }
  acc[answer].percentage = num / numOfPlayers
  return acc;
}, {});

export const getQuestionableCheckedAnswers = ({ playersCount, questionableEntries }) => {

  const percentages = getPercentage(playersCount, questionableEntries) // w/ pid
  return Object.entries(percentages).reduce((acc, [answer, { percentage }]: Array<any>) => {

    // if (playersCount <= 2 && percentage >= 0.5) {
    acc.push({ id: answer, percentage })
    // } else if (playersCount > 2 && percentage > 0.5) {
    // acc.push({ id: answer, percentage })
    // } else {
    // updatedScoreboard[playerId].roundScores[activeLetter].answers.find(({ answerId }) => answerId === id)['percentage'] = percentage;
    // should do updatedScoreboard[playerId].roundScores[activeLetter].answers.find(({ answerId }) => answerId === id)['percentage'] = percentage 
    // but no access to playerId
    // }
    return acc;
  }, []);
}

export const getUpdatedScoreboard = ({ scoreboard = {}, activeRound, activeLetter = '', playersCount = 0 }) => {
  const updatedScoreboard = cloneDeep(scoreboard);
  const { allAnswers, pointable, questionable, questionableEntries } = activeRound;

  // get filtered questionable entries
  const entriesRight = getQuestionableCheckedAnswers({ playersCount, questionableEntries })
  const foundQuestionableRight = entriesRight.reduce((acc, { id, percentage }) => {
    const foundAnswer = questionable.find(({ answerId }) => id === answerId);
    if (!foundAnswer) {
      return acc;
    }
    if (playersCount <= 2 && percentage >= 0.5) {
      acc.push({ ...foundAnswer })
    } else if (playersCount > 2 && percentage > 0.5) {
      acc.push({ ...foundAnswer })
    }

    return acc;
  }, []);

  // populate updatedScoreboard with all answers
  allAnswers.forEach(({ answer, playerId, answerId, category }) => {
    if (!updatedScoreboard[playerId].roundScores[activeLetter]) {
      updatedScoreboard[playerId].roundScores[activeLetter] = { answers: [], roundPoints: 0, round: activeRound }
    }
    const round = updatedScoreboard[playerId].roundScores[activeLetter];
    round.answers.push({ category, answer, playerId, answerId, points: 0 });    //copy deep here
  });

  // populate updatedScoreboard with pointable answers
  pointable.forEach(({ playerId, answerId: id }) => {
    updatedScoreboard[playerId].roundScores[activeLetter].answers.find(({ answerId }) => answerId === id)['points'] += 5;
    updatedScoreboard[playerId].finalPoints += 5;
    updatedScoreboard[playerId].roundScores[activeLetter].roundPoints += 5;
  });

  // add all questionable-right 10 pts
  foundQuestionableRight.forEach(answer => {
    updatedScoreboard[answer.playerId].roundScores[activeLetter].answers.find(({ answerId }) => answerId === answer.answerId)['points'] += 10;
    updatedScoreboard[answer.playerId].finalPoints += 10;
    updatedScoreboard[answer.playerId].roundScores[activeLetter].roundPoints += 10;
  });

  const pointableAndQuestRight = [...pointable, ...foundQuestionableRight];
  const pointableAndQuestRightCategories = pointableAndQuestRight.reduce((acc, answer) => {
    if (!acc[answer.category]) {
      // eslint-disable-next-line no-param-reassign
      acc[answer.category] = [];
    }
    acc[answer.category].push(answer);
    return acc;
  }, {});


  // if pointableAndQuestRightCategories.length === 1 add 5 pts to an answer
  Object.entries(pointableAndQuestRightCategories).forEach(([category, answers]) => {
    if (pointableAndQuestRightCategories[category].length === 1) {
      updatedScoreboard[answers[0].playerId].roundScores[activeLetter].answers.find(({ answerId }) => answerId === answers[0].answerId)['points'] += 5
      updatedScoreboard[answers[0].playerId].finalPoints += 10;
      updatedScoreboard[answers[0].playerId].roundScores[activeLetter].roundPoints += 10;
    }
  });
  return updatedScoreboard;
}
