import socketIo from 'socket.io';

export default ({
  io,
  socket,
  logger,
}: {
  io: socketIo.Server;
  socket: socketIo.Socket;
  logger: any;
}) => {};
