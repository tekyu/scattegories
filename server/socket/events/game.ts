import socketIo from 'socket.io';
import { nanoid } from 'nanoid';
import cloneDeep from 'clone-deep';
import { emptyRound, getActiveRound, getNewLetter, getAllAnswers, createScoreboard, getQuestionableCheckedAnswers, getRandomLetter, getSortedAllAnswers, roundEntry, getUpdatedScoreboard, shouldGameEnd, findWinnerId } from './utils/gameUtils';
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
const PLAY_AGAIN_SEND = `PLAY_AGAIN_SEND`;
const PLAY_AGAIN_PLAYERS = `PLAY_AGAIN_PLAYERS`;

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

  const roundSummary = () => {
    let room = getRoom();
    const { activeLetter, rounds } = room;
    const scoreboard = getUpdatedScoreboard({ scoreboard: room.scoreboard, activeRound: getActiveRound({ rounds, activeLetter }), activeLetter, playersCount: room.players.length });
    const stage = 6;
    room = updateRoom(room, { stage, scoreboard });
    // timeoutedSetupNextRound(10000);
    console.log('roundSummary', room);
    return room;
  }

  const emitSummary = (scoreboard = {}, roomObjectToUpdate = {}) => {
    const roomId = getRoomId();
    console.log('emitSummary', scoreboard, roomObjectToUpdate);
    io.in(roomId).emit(UPDATE_ROOM, roomObjectToUpdate);
    io.in(roomId).emit(UPDATE_SCOREBOARD, scoreboard);
  }


  const updateRoom = (room, updateObject) => {
    const clonedRoom = cloneDeep(room);
    Object.entries(updateObject).forEach(([key, value]) => {
      clonedRoom[key] = value;
    });
    return clonedRoom;
  }

  const timeoutedSetupNextRound = time => {
    setTimeout(() => {
      setupNextRound()
    }, time);
  }


  // try binding to this
  const setupNextRound = () => {
    const roomId = getRoomId();
    const room = getRoom();
    if (!room) {
      logger.error('Cannot setup next round - room is undefined', room);
      return;
    }
    const { letters, letter } = getNewLetter(room.letters);
    room.letters = letters;
    room.activeLetter = letter;
    room.roundNumber += 1;
    room.rounds.push(emptyRound({ letter, lastRoundIndex: room.roundNumber }));
    io.in(roomId).emit(STARTING_ROUND, {});
    room.stage = 1;
    io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage, scoreboard: room.scoreboard, roundNumber: room.roundNumber });

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

  const roundStop = () => {
    console.log('roundStop');
  };

  const startGame = async () => {
    const roomId = getRoomId();
    const room = getRoom();
    room.scoreboard = createScoreboard(room.players);
    await setupNextRound();
  };

  const roundCheck = async () => {
    const roomId = getRoomId();
    const room = getRoom();
    const { activeLetter, rounds, categories } = room;
    const { entries } =
      room.rounds.find(({ letter }) => letter === activeLetter) || [];
    console.log('[game.ts] [roundCheck]', entries);

    const activeRound = getActiveRound({ rounds, activeLetter: activeLetter })

    const { pointable, questionable, allAnswers } = await getSortedAllAnswers({
      entries,
    });
    activeRound.questionable = questionable;
    activeRound.questionableEntries = {};
    activeRound.pointable = pointable;
    activeRound.allAnswers = allAnswers;
    console.log('roundcHECK', pointable, questionable, allAnswers)
    if (isObjectEmpty(questionable)) {
      // go to giving points

      // THIS SHOULD GO TO ANOTHER FUNCTION
      let room = getRoom();
      room = roundSummary();
      const { maxScore, scoreboard } = room;
      console.log('round summary', room);

      if (shouldGameEnd({ maxScore, scoreboard })) {
        console.log('GAME SHOULD END HERE');
        const winnerId = findWinnerId({ maxScore, scoreboard });
        return;
      }
      emitSummary(room.scoreboard, { stage: room.stage },);
      timeoutedSetupNextRound(room.nextRoundTimeout);
      console.log('[roundCheck][questionable empty][proceed to giving points]');
      // THIS SHOULD GO TO ANOTHER FUNCTION

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
    let room = getRoom();
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
      io.in(roomId).emit(QUESTIONABLE_ANSWERS_SENT_NOT_VOTED, { names: namesOfPlayers });
    } else {

      //round summary
      console.log(QUESTIONABLE_ANSWERS_SENT, 'points here');
      room = roundSummary();
      const { maxScore, scoreboard } = room;
      console.log('round summary', room);

      if (shouldGameEnd({ maxScore, scoreboard })) {
        console.log('GAME SHOULD END HERE');
        const winnerId = findWinnerId({ maxScore, scoreboard });
        const winner = room.players.find(({ id }) => winnerId === id);
        room.winners.push(winner);
        room.stage = 7;
        io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage, winners: room.winners });

        return;
      }
      emitSummary(room.scoreboard, { stage: room.stage });
      timeoutedSetupNextRound(10000);
      // const { activeLetter } = room;
      // room.scoreboard = getUpdatedScoreboard({ scoreboard: room.scoreboard, activeRound, activeLetter, playersCount: room.players.length });

      // room.stage = 6;
      // io.in(roomId).emit(UPDATE_SCOREBOARD, room.scoreboard);
      // io.in(roomId).emit(UPDATE_ROOM, { stage: room.stage });

      // const time = 10000;
      // setTimeout(() => {
      //   setupNextRound()
      // }, time);

      // pointable -> these are duplicates so always are eligible to 5pts
      // right answers -> pointable on percentage comparison - 0/10pts
      // need to check if there is only 1 correct answer in each category - then 15pts
      // 
    }
    // const round = rounds.find(({ letter }) => letter === activeLetter);

  });

  socket.on(PLAY_AGAIN_SEND, () => {
    const room = getRoom();
    console.log('PLAY_AGAIN_SEND AGAIN', socket.id, room.id);
    if (room.playAgain.some(socket.id)) {
      room.playAgain = room.playAgain.filter(id => socket.id !== id);
    } else {
      room.playAgain.push(socket.id);
    }

    if (room.playAgain.length === room.players.length) {
      // reset all
      console.log('play again')
    }
  });

};
