import socketIo from 'socket.io';
import ICreateRoomOptions from '../../room/interfaces/ICreateRoomOptions';
import IJoinRoomOptions from '../../room/interfaces/IJoinRoomOptions';
import Room from '../../room/Room';
import Player from '../../player/player.model';

const JOIN_ROOM = 'JOIN_ROOM';
const CREATE_ROOM = 'CREATE_ROOM';
const LEAVE_ROOM = 'LEAVE_ROOM';

export default ({
  io,
  socket,
  logger,
}: {
  io: socketIo.Server;
  socket: socketIo.Socket;
  logger: any;
}) => {
  socket.on(CREATE_ROOM, (params: ICreateRoomOptions, callback: Function) => {
    const room = new Room(params, socket.id);
    const { id } = room;
    // @ts-ignore
    io.gameRooms[id] = room;
    // @ts-ignore
    console.log('CREATE ROOM ->', id);
    callback({ id });
  });

  socket.on(JOIN_ROOM, (params: IJoinRoomOptions, callback: Function) => {
    const { roomId, username } = params;
    //@ts-ignore
    if (io.gameRooms[roomId]) {
      const playerState = socket.id === io.gameRooms[roomId].admin ? 1 : 0
      const { player } = new Player({ id: socket.id, username, state: playerState });
      //@ts-ignore
      io.gameRooms[roomId].players.push(player);
      socket.join(roomId);
      socket.gameOptions.activeRoom = roomId;
      //@ts-ignore
      io.in(roomId).emit('UPDATE_PLAYERS', io.gameRooms[roomId].players);
      //@ts-ignore
      callback({ room: io.gameRooms[roomId], user: player });
      console.log('JOIN ROOM ->', roomId);
    }
    callback({ error: 'Gra nie istnieje' });
  });

  socket.on(LEAVE_ROOM, ({ roomId }) => {
    // @ts-ignore
    const room = io.gameRooms[roomId];
    console.log('LEAVE ROOM ->', roomId);
    if (!room) {
      return;
    }
    room.disconnectPlayer(socket.id);
    socket.leave(socket.id);
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
      io.in(roomId).emit('UPDATE_ROOM', objectToUpdate);
      io.in(roomId).emit('UPDATE_PLAYERS', io.gameRooms[roomId].players);
    } else {
      delete io.gameRooms[roomId];
    }
  });

  socket.on('CHANGE_STATE', ({ state }) => {
    const roomId = socket.gameOptions.activeRoom;
    const room = io.gameRooms[roomId];
    const player = room.players.find(({ id }) => id === socket.id);
    player.state = state;
    console.log('payload', state, socket.gameOptions, player, room.players);
    io.in(roomId).emit('UPDATE_PLAYERS', io.gameRooms[roomId].players);
  });
};
