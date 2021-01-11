import cloneDeep from 'clone-deep';
import { nanoid } from 'nanoid';

export const getInitialAnswersArray = (categories) => {
  console.log('[getInitialAnswersArray]', categories);
  return categories.reduce((initial, category) => {
    console.log('[getInitialAnswersArray][REDUCE]', initial, category);
    initial[category] = [];
    return initial;
  }, {});
};

export const getAllAnswers = (entries, initialAllAnswers) => {
  return (
    entries.reduce((answers, entry) => {
      console.log('acc', answers);
      Object.entries(entry.answers).forEach(([category, answer]) => {
        console.log(category, answer);
        answers[category].push({
          answer,
          playerId: entry.playerId,
          answerId: nanoid(6),
        });
      });
      return answers;
    }, cloneDeep(initialAllAnswers)) || {}
  );
};

export const getSortedAnswers = (allAnswers) => {
  return Object.entries(allAnswers).reduce(
    (acc, [category, answers]) => {
      console.log('entry', category, answers);
      const nodupes = [];
      const dupes = answers.filter((v1, i1, self) => {
        const ndx = self.findIndex(function (v2, i2) {
          // make sure not looking at the same object (using index to verify)
          // use JSON.stringify for object comparison
          console.log(
            `i1 ${i1} i2 ${i2}`,
            v1.answer,
            v2.answer,
            v1.answer == v2.answer
          );
          return i1 != i2 && v1.answer == v2.answer;
        });
        console.log(`TU? i1 ${i1} ndx ${ndx}`, v1);
        if (i1 != ndx && ndx === -1) {
          console.log('NO DUPE', v1);
          nodupes.push(v1);
        }
        return i1 != ndx && ndx != -1;
      });
      acc.pointable[category] = dupes;
      acc.questionable[category] = nodupes;
      return acc;
    },
    { pointable: {}, questionable: {} }
  );
};

export const getSortedAllAnswers = async ({
  categories = [],
  entries = [],
}) => {
  console.log('[getSortedAllAnswers]', categories, entries);
  const initialAllAnswers = getInitialAnswersArray(categories);
  console.log('[getSortedAllAnswers][initialAllAnswers]', initialAllAnswers);
  const allAnswers = getAllAnswers(entries, initialAllAnswers);
  console.log('[getSortedAllAnswers][allAnswers]', allAnswers);
  return getSortedAnswers(allAnswers);
};
