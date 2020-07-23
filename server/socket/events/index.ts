import config from '../../config';
import roomEvents from './room';
import gameEvents from './game';
import socketIo from 'socket.io';

export default async ({
  io,
  socket,
  logger,
}: {
  io: socketIo.Server;
  socket: socketIo.Socket;
  logger: any;
}) => {
  await roomEvents({ io, socket, logger });
  await gameEvents({ io, socket, logger });
};
