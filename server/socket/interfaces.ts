import socketIo from 'socket.io';

export interface IGameOptions {
    activeRoom: string;
}
export interface ISocketIO extends socketIo.Server {
    gameRooms: object;
}

export interface ISocket extends socketIo.Socket {
    gameOptions: IGameOptions;
}