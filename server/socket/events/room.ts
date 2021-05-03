import socketIo from 'socket.io';
import ICreateRoomOptions from '../../room/interfaces/ICreateRoomOptions';
import IJoinRoomOptions from '../../room/interfaces/IJoinRoomOptions';
import Room from '../../room/Room';
import Player from '../../player/player.model';
import { Logger } from 'winston';
import { ISocket, ISocketIO } from '../interfaces';

const JOIN_ROOM = 'JOIN_ROOM';
const CREATE_ROOM = 'CREATE_ROOM';
const LEAVE_ROOM = 'LEAVE_ROOM';
const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
const UPDATE_ROOM = 'UPDATE_ROOM';


export default ({
  io,
  socket,
  logger,
}: {
  io: ISocketIO;
  socket: ISocket;
  logger: Logger;
}) => {
  const getRoomId = () => {
    return socket.gameOptions.activeRoom
  }

  const getRoom = () => {
    return io.gameRooms[getRoomId()];
  }

  socket.on(CREATE_ROOM, (params: ICreateRoomOptions, callback: Function) => {
    const room = new Room(params, socket.id);
    const { id } = room;
    io.gameRooms[id] = room;
    logger.info('CREATE ROOM ->', params);
    logger.info('1111 CREATE ROOM ->', room);
    callback({ id });
  });

  socket.on(JOIN_ROOM, (params: IJoinRoomOptions, callback: Function) => {
    const { roomId, username } = params;
    if (!io.gameRooms[roomId]) {
      callback({ error: `Room doesn't exist` });
    } else if (io.gameRooms[roomId].players.length >= io.gameRooms[roomId].playersMax) {
      callback({ error: 'Room is full' });
    } else {
      const playerState = socket.id === io.gameRooms[roomId].owner ? 1 : 0;
      const { player } = new Player({
        id: socket.id,
        username,
        state: playerState,
      });
      io.gameRooms[roomId].players.push(player);
      socket.join(roomId);
      socket.gameOptions.activeRoom = roomId;
      io.in(roomId).emit(UPDATE_PLAYERS, io.gameRooms[roomId].players);
      callback({ room: io.gameRooms[roomId], user: player });
      logger.info('JOIN ROOM ->', roomId);
      return;
    }
  });

  socket.on('disconnect', () => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    logger.info('LEAVE ROOM ->', roomId);
    if (!room) {
      return;
    }
    room.disconnectPlayer(socket.id);
    socket.leave(socket.id);
    // @ts-ignore
    delete socket.gameOptions.activeRoom;

    const objectToUpdate: {
      players: Array<Player>;
      owner?: string;
      admin?: string;
    } = {
      players: room.players,
    };

    if (room.owner === socket.id) {
      const newOwner = room.players[0];
      room.owner = newOwner ? newOwner.id : null;
      objectToUpdate.owner = room.owner;
    }

    if (room.admin === socket.id) {
      const newOwner = room.players[0];
      room.owner = newOwner ? newOwner.id : null;
      room.admin = newOwner ? newOwner.id : null;
      objectToUpdate.owner = room.owner;
      objectToUpdate.admin = room.admin;
    }

    if (room.players.length > 0) {
      io.in(roomId).emit(UPDATE_ROOM, objectToUpdate);
      io.in(roomId).emit(UPDATE_PLAYERS, io.gameRooms[roomId].players);
    } else {
      delete io.gameRooms[roomId];
    }
  });

  socket.on(LEAVE_ROOM, ({ roomId }: { roomId: string }) => {
    // @ts-ignore
    const room = io.gameRooms[roomId];
    logger.info('LEAVE ROOM ->', roomId);
    if (!room) {
      return;
    }
    room.disconnectPlayer(socket.id);
    socket.leave(socket.id);
    // @ts-ignore
    delete socket.gameOptions.activeRoom;

    const objectToUpdate: {
      players: Array<Player>;
      owner?: string;
      admin?: string;
    } = {
      players: room.players,
    };

    if (room.owner === socket.id) {
      const newOwner = room.players[0];
      room.owner = newOwner ? newOwner.id : null;
      objectToUpdate.owner = room.owner;
    }

    if (room.admin === socket.id) {
      const newOwner = room.players[0];
      room.owner = newOwner ? newOwner.id : null;
      room.admin = newOwner ? newOwner.id : null;
      objectToUpdate.owner = room.owner;
      objectToUpdate.admin = room.admin;
    }

    if (room.players.length > 0) {
      io.in(roomId).emit(UPDATE_ROOM, objectToUpdate);
      io.in(roomId).emit(UPDATE_PLAYERS, io.gameRooms[roomId].players);
    } else {
      delete io.gameRooms[roomId];
    }
  });

  socket.on(CHANGE_USER_STATE, () => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    // @ts-ignore
    const player = room.players.find(({ id }) => id === socket.id);
    player.state = player.state === 0 || player.state === 2 ? 1 : 0;
    io.in(roomId).emit(UPDATE_PLAYERS, io.gameRooms[roomId].players);
  });
};
