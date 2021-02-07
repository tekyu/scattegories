import socketIo from 'socket.io';
import { nanoid } from 'nanoid';
import cloneDeep from 'clone-deep';
import { emptyRound, getActiveRound, getNewLetter, getAllAnswers, createScoreboard, getQuestionableCheckedAnswers, getRandomLetter, getSortedAllAnswers, roundEntry, getUpdatedScoreboard } from './utils/gameUtils';
import { isObjectEmpty } from '../../utils/utils';
// https://github.com/losandes/socket.io-mongodb
// https://github.com/socketio/socket.io-redis

const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
const GAME_READY_STATUS = 'GAME_READY_STATUS';
const SEND_ANSWERS = `SEND_ANSWERS`;
const STARTING_ROUND = `STARTING_ROUND`;
const UPDATE_ROOM = `UPDATE_ROOM`;
const ROUND_LETTER = `ROUND_LETTER`;
const UPDATE_GAME = `UPDATE_GAME`;
const ROUND_START = `ROUND_START`;
const QUESTIONABLE_ANSWERS = `QUESTIONABLE_ANSWERS`;
const QUESTIONABLE_ANSWERS_SENT = `QUESTIONABLE_ANSWERS_SENT`;
const QUESTIONABLE_ANSWERS_SENT_NOT_VOTED = `QUESTIONABLE_ANSWERS_SENT_NOT_VOTED`;
const STARTING_GAME = `STARTING_GAME`;
const WAITING_TIME = `WAITING_TIME`;
const UPDATE_SCOREBOARD = `UPDATE_SCOREBOARD`;

export default ({
  io,
  socket,
  logger,
}: {
  io: socketIo.Server;
  socket: socketIo.Socket;
  logger: any;
}) => {

  const getRoomId = () => {
    // @ts-ignore
    return socket.gameOptions.activeRoom
  }

  const getRoom = () => {
    // @ts-ignore
    return io.gameRooms[getRoomId()];
  }

  // const setupNextRound = () => {
  //   const room = getRoom();
  //   const { letter, index } = getRandomLetter(room.letters);
  //   if (index > -1) {
  //     room.letters.splice(index, 1);
  //   }
  //   return { letter };
  // };

  const roundStop = () => {
    console.log('roundStop');
  };

  const startGame = () => {
    const roomId = getRoomId();
    const room = getRoom();
    const { letters, letter } = getNewLetter(room.letters);
    room.scoreboard = createScoreboard(room.players);
    room.letters = letters;
    room.activeLetter = letter;
    room.rounds.push(emptyRound({ letter }));
    io.in(roomId).emit(STARTING_ROUND, {});
    room.stage = 1;
    io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage, scoreboard: room.scoreboard });
    setTimeout(function () {
      io.in(roomId).emit(ROUND_LETTER, { letter });
      io.in(roomId).emit(UPDATE_GAME, { letters: room.letters });
      setTimeout(function () {
        io.in(roomId).emit(ROUND_START, {});
        room.stage = 2;
        io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });
      }, 2000);
    }, 4000);
  };

  const roundCheck = async () => {
    const roomId = getRoomId();
    const room = getRoom();
    const { activeLetter, rounds, categories } = room;
    const { entries } =
      room.rounds.find(({ letter }) => letter === activeLetter) || [];
    console.log('[game.ts] [roundCheck]', entries);

    const { pointable, questionable, allAnswers } = await getSortedAllAnswers({
      categories,
      entries,
    });

    if (isObjectEmpty(questionable)) {
      // go to giving points
      console.log('[roundCheck][questionable empty][proceed to giving points]');
    } else {
      // send questionable answers
      room.stage = 5;
      const activeRound = getActiveRound({ rounds, activeLetter: activeLetter })
      activeRound.questionableEntries = {};
      activeRound.questionable = questionable;
      activeRound.pointable = pointable;
      activeRound.allAnswers = allAnswers;
      io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });
      io.in(roomId).emit(QUESTIONABLE_ANSWERS, questionable);
    }
    console.log('POINTABLE', pointable);
    console.log('QUESTIONABLE', questionable);
    // todo
    // dac punkty tym co sie powtarzaja
    // pokazac questionable answers
  };

  socket.on(GAME_READY_STATUS, () => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA', GAME_READY_STATUS, socket.id);
    const room = getRoom();

    if (!room.readyStatus) {
      room.readyStatus = {};
    }
    room.readyStatus[socket.id] =
      typeof room.readyStatus[socket.id] === 'undefined'
        ? true
        : !room.readyStatus[socket.id];

    if (
      room.players.length === Object.keys(room.readyStatus).length &&
      !Object.values(room.readyStatus).some((value) => value === false)
    ) {
      console.log('EVERYONE IS READY');
      startGame();
    }
  });

  socket.on(CHANGE_USER_STATE, (params: any, callback: Function) => {
    console.log('GAME.TS', CHANGE_USER_STATE);
    const roomId = getRoomId();
    const room = getRoom();


    // if (room.players.length <= 1) {
    //   return;
    // }

    const isAnyPlayerNotReady = room.players.find(({ state }) => state !== 1);

    if (isAnyPlayerNotReady) {
      console.log('SOMEONES NOT READY');
      return;
    }

    const time = 5000;
    room.state = 2; // started
    io.in(roomId).emit(STARTING_GAME, { time: time - 1000 });
    setTimeout(() => {
      console.log('SHOULD START AFTER 5S');
      io.in(roomId).emit(UPDATE_ROOM, { state: room.state });
    }, time);
  });

  socket.on(SEND_ANSWERS, ({ answers }: any) => {
    const roomId = getRoomId();
    const room = getRoom();

    const { activeLetter, rounds } = room;

    const round = rounds.find(({ letter }) => letter === activeLetter);
    const player = round.entries.find(({ playerId }) => playerId === socket.id);
    if (!player) {
      round.entries.push(roundEntry({ id: socket.id, answers }));
      console.log('Round Entries', round.entries);
    } else {
      player.answers = answers;
    }

    if (round.entries.length === room.players.length) {
      room.stage = 4;
      io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });
      roundCheck();
    }

    console.log('[game.ts]', SEND_ANSWERS, answers);
    if (room.stage <= 2) {
      room.stage = 3;
      io.in(roomId).emit(WAITING_TIME, { time: room.timeWaiting });
      io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });
      console.log('[game.ts]', SEND_ANSWERS, 'stage change');
      setTimeout(() => {
        if (room.stage >= 4) return;
        room.stage = 4;
        console.log('SHOULD START AFTER 5S');
        // io.in(roomId).emit('WAITING_TIME', { time: 0 });
        io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });
      }, room.timeWaiting);
    }
  });

  socket.on(QUESTIONABLE_ANSWERS_SENT, ({ answers }: any) => {
    const roomId = getRoomId();
    const room = getRoom();
    console.log('[game.ts][QUESTIONABLE_ANSWERS_SENT]', answers)
    const { activeLetter, rounds, players, categories } = room;
    const activeRound = getActiveRound({ rounds, activeLetter: activeLetter })
    activeRound.questionableEntries[socket.id] = answers;

    // util function to check
    const numOfNotVoted = players.length - Object.keys(activeRound.questionableEntries).length
    if (numOfNotVoted > 0) {
      const namesOfPlayers = Object.keys(activeRound.questionableEntries).map(playerId => {
        players.find(({ id }) => playerId === id).username;
      })
      console.log(QUESTIONABLE_ANSWERS_SENT, 'numOfNotVoted', numOfNotVoted);
      io.in(roomId).emit(QUESTIONABLE_ANSWERS_SENT_NOT_VOTED, { names: namesOfPlayers });
    } else {
      console.log(QUESTIONABLE_ANSWERS_SENT, 'points here');
      // sort questionableEntries
      // merge to pointable
      const { activeLetter } = room;
      room.scoreboard = getUpdatedScoreboard({ scoreboard: room.scoreboard, activeRound, activeLetter, playersCount: room.players.length });

      // console.log('[QUESTIONABLE_ANSWERS_SENT][allAnswers]', activeRound.allAnswers);
      // console.log('************* round', activeRound);
      // console.log('************* POINTABLE', activeRound.pointable);
      // console.log('************* ENTRIES', activeRound.questionableEntries);
      // console.log('************* questionable', activeRound.questionable);
      // console.log('************* RIGHT ANSWERS', getQuestionableCheckedAnswers(room.players.length, activeRound.questionableEntries));
      // console.log('************* UPDATED SCOREBOARD', getUpdatedScoreboard({ scoreboard, activeRound, activeLetter, playersCount: room.players.length }));
      console.log('test', JSON.stringify(room.scoreboard))
      // room.stage = 6;
      io.in(roomId).emit(UPDATE_SCOREBOARD, room.scoreboard);

      // pointable -> these are duplicates so always are eligible to 5pts
      // right answers -> pointable on percentage comparison - 0/10pts
      // need to check if there is only 1 correct answer in each category - then 15pts
      // 
    }
    // const round = rounds.find(({ letter }) => letter === activeLetter);

  });

};





// // populate roundscores
// all.forEach(({ answer, playerId, answerId, category }) => {
//   console.log('answer', answer, playerId, answerId, scoreboard[playerId]);
//   if (!scoreboard[playerId] || !scoreboard[playerId].roundScores) {
//     scoreboard[playerId] = { roundScores: { 'k': { answers: [], roundPoints: 0, round: 1 } }, finalPoints: 0 }
//   }
//   const round = scoreboard[playerId].roundScores['k'];
//   round.answers.push({ category, answer, playerId, answerId, points: 0 });
//   //copy deep here
// })

// give all pointable 5 pts

// dumping ideas
// pointable.forEach(({ playerId, answerId: id }) => {
//   console.log('scr', scoreboard[playerId].roundScores['k'].answers);
//   scoreboard[playerId].roundScores['k'].answers.find(({ answerId }) => answerId === id)['points'] += 5
// })

// // get questionable right
// const questRight = right.reduce((acc, { id, percentage, category }) => {
//   console.log('RIGHT ------', id, percentage, category)
//   const foundAnswer = questionable.find(({ answerId }) => id === answerId);
//   if (foundAnswer && percentage > 0.5) {

//     acc.push(foundAnswer)
//   }
//   return acc;
// }, [])

// // add all questionable-right 10 pts
// questRight.forEach(answer => {
//   console.log('ans', answer);
//   console.log('scr', scoreboard[answer.playerId].roundScores['k'].answers);
//   scoreboard[answer.playerId].roundScores['k'].answers.find(({ answerId }) => answerId === answer.answerId)['points'] += 10
// })

// // iterate over merged pointable and quuestionable-right
// // use clone deep here 
// const pointableAndQuestRight = [...pointable, ...questRight]

// // if cat.length === 1 add 5 pts to an answer
// pointableAndQuestRightCategories = pointableAndQuestRight.reduce((acc, answer) => {
//   if (!acc[answer.category]) {
//     // eslint-disable-next-line no-param-reassign
//     acc[answer.category] = [];
//   }
//   acc[answer.category].push(answer);
//   return acc;
// }, {});

// Object.entries(pointableAndQuestRightCategories).forEach(([category, answers]) => {
//   console.log('d', pointableAndQuestRightCategories[category].length)
//   if (pointableAndQuestRightCategories[category].length === 1) {
//     console.log('1', answers)
//     scoreboard[answers[0].playerId].roundScores['k'].answers.find(({ answerId }) => answerId === answers[0].answerId)['points'] += 5
//   }
// });