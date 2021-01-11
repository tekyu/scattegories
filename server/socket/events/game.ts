import socketIo from 'socket.io';
import { nanoid } from 'nanoid';
import cloneDeep from 'clone-deep';
import { getSortedAllAnswers } from './utils/gameUtils';
import { isObjectEmpty } from '../../utils/utils';
// https://github.com/losandes/socket.io-mongodb
// https://github.com/socketio/socket.io-redis

const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
const GAME_READY_STATUS = 'GAME_READY_STATUS';
const SEND_ANSWERS = `SEND_ANSWERS`;

const roundEntry = ({ id, answers }) => {
  return {
    playerId: id,
    answers,
    roundPoints: 0,
  };
};

const emptyRound = ({ letter }) => {
  return {
    letter,
    entries: [],
    id: nanoid(),
  };
};

export default ({
  io,
  socket,
  logger,
}: {
  io: socketIo.Server;
  socket: socketIo.Socket;
  logger: any;
}) => {
  const getRandomLetter = (alphabet) => {
    const min = 0;
    const max = alphabet.length;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('getRandomLetter', random, alphabet, {
      letter: alphabet[random],
    });
    return { letter: alphabet[random], index: random };
  };

  const setupNextRound = () => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    const { letter, index } = getRandomLetter(room.letters);
    if (index > -1) {
      room.letters.splice(index, 1);
    }
    return { letter };
  };

  const roundStop = () => {
    console.log('roundStop');
  };

  const startGame = () => {
    const { letter } = setupNextRound();
    console.log('startGame', io.gameRooms[socket.gameOptions.activeRoom]);
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    room.activeLetter = letter;
    room.rounds.push(emptyRound({ letter }));
    io.in(roomId).emit('STARTING_ROUND', {});
    room.stage = 1;
    io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
    setTimeout(function () {
      io.in(roomId).emit('ROUND_LETTER', { letter });
      io.in(roomId).emit('UPDATE_GAME', { letters: room.letters });
      setTimeout(function () {
        io.in(roomId).emit('ROUND_START', {});
        room.stage = 2;
        io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
      }, 2000);
    }, 4000);
  };

  const roundCheck = async () => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    const { activeLetter, rounds, categories } = room;
    const { entries } =
      room.rounds.find(({ letter }) => letter === activeLetter) || [];
    console.log('[game.ts] [roundCheck]', entries);

    const { pointable, questionable } = await getSortedAllAnswers({
      categories,
      entries,
    });

    if (isObjectEmpty(questionable)) {
      // go to giving points
      console.log('[roundCheck][questionable empty][proceed to giving points]');
    } else {
      // send questionable answers
      room.stage = 5;
      const activeRound = room.rounds.find(
        ({ letter }) => letter === room.activeLetter
      );
      activeRound.questionableEntries = {};
      activeRound.questionable = questionable;
      activeRound.pointable = pointable;
      io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
      io.in(roomId).emit('QUESTIONABLE_ANSWERS', questionable);
    }
    console.log('POINTABLE', pointable);
    console.log('QUESTIONABLE', questionable);
    // todo
    // dac punkty tym co sie powtarzaja
    // pokazac questionable answers
  };

  socket.on(GAME_READY_STATUS, () => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA', GAME_READY_STATUS, socket.id);
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
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
    // callback(params)
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];

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
    io.in(roomId).emit('STARTING_GAME', { time: time - 1000 });
    setTimeout(() => {
      console.log('SHOULD START AFTER 5S');
      io.in(roomId).emit('UPDATE_ROOM', { state: room.state });
    }, time);
  });

  socket.on(SEND_ANSWERS, ({ answers }: any) => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
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
      io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
      roundCheck();
    }

    console.log('[game.ts]', SEND_ANSWERS, answers);
    if (room.stage <= 2) {
      room.stage = 3;
      io.in(roomId).emit('WAITING_TIME', { time: room.timeWaiting });
      io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
      console.log('[game.ts]', SEND_ANSWERS, 'stage change');
      setTimeout(() => {
        if (room.stage === 4) return;
        room.stage = 4;
        console.log('SHOULD START AFTER 5S');
        // io.in(roomId).emit('WAITING_TIME', { time: 0 });
        io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
      }, room.timeWaiting);
    }
  });
};
