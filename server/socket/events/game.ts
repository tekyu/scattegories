import socketIo from 'socket.io';

const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
const GAME_READY_STATUS = 'GAME_READY_STATUS';
const SEND_ANSWERS = `SEND_ANSWERS`;

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

  socket.on(SEND_ANSWERS, (params: any) => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    room.stage = 3;
    io.in(roomId).emit('WAITING_TIME', { time: room.timeWaiting });
    io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
    console.log('[game.ts]', SEND_ANSWERS, params);
    setTimeout(() => {
      //   room.stage = 4;
      //   console.log('SHOULD START AFTER 5S');
      io.in(roomId).emit('WAITING_TIME', { time: 0 });
      //   io.in(roomId).emit('UPDATE_ROOM', { stage: room.stage });
    }, room.timeWaiting);
  });
};
