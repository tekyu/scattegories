import http from 'http';
import socketIo from 'socket.io';
import express from 'express';
import config from '../config';

const WAITING_ROOM = 'WAITING_ROOM';

const ioEvents = (io: any, logger: any) => {
  io.on('connection', async (socket: any) => {
    logger.info(`Connection with socket server established for ${socket.id}`);
    socket.gameOptions = {};
    socket.on('disconnect', () => {
      logger.info(`Connection with socket shut down for ${socket.id}`);
      socket.leave(WAITING_ROOM);
    });

    await require('../socket/events').default({
      io,
      socket,
      logger: logger,
    });

    logger.info(`All events loaded for ${socket.id}`);
  });
}; // io connection

const SocketIo = (app: any, logger: any) => {
  const port = config.ports.socket || 3012;
  const server = http.createServer();
  const io = socketIo(server);

  // @ts-ignore
  io.eio.pingTimeout = parseInt(config.socket.pingTimeout, 10); // 5 minutes
  // @ts-ignore
  io.eio.pingInterval = parseInt(config.socket.pingInterval, 10); // 5 seconds
  // @ts-ignore
  io.gameRooms = {};

  ioEvents(io, logger);

  server.listen(port, () =>
    logger.info(
      `###### Socket server listening on port ${config.ports.socket} ######`
    )
  );
};

export default ({ app, logger }: { app: express.Application; logger: any }) => {
  SocketIo(app, logger);
};
