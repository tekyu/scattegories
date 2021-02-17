import IRoom from './interfaces/IRoom';
import hri from 'human-readable-ids';

import ICreateRoomOptions from './interfaces/ICreateRoomOptions';

export default class Room implements IRoom {
  playersMax: number;
  categories: Array<String>;
  maxScore: number;
  id: string;
  owner: string;
  admin: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
  stage: number; // 0 - idle | 1 - choosing | 2 - writing | 3 - waiting | 4 - checking | 5 - questionable | 6 - round summary | 7 - ended
  players: Array<Object>;
  winners: Array<String>;
  createdAt: number;
  chat: Array<Object>;
  scoreboard: Object;
  timePerRound: number;
  rounds: Array<Object>;
  letters: Array<string>;
  activeLetter: string;
  roundNumber: number;
  timeWaiting: number;
  nextRoundTimeout: number;
  playAgain: Array<string>;

  constructor(
    {
      playersMax,
      maxScore,
      username,
      categories,
      timePerRound,
      timeWaiting,
    }: ICreateRoomOptions,
    socketId: any
  ) {
    this.playersMax = playersMax || 10; // check for max players per game (adjustable in gameMapping)
    this.categories = categories;
    this.maxScore = maxScore || this.categories.length * 10 * 6;
    this.id = hri.hri.random().split('-').join('');
    this.owner = socketId;
    this.admin = socketId;
    this.state = 0;
    this.players = [];
    this.winners = [];
    this.createdAt = Date.now();
    this.scoreboard = {};
    this.chat = [];
    this.roundNumber = 0;
    this.timePerRound = timePerRound ? timePerRound * 1000 : 1000;
    this.rounds = [];
    this.letters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ]; // change this to locale alphabet
    this.timeWaiting = timeWaiting || 5000;
    this.activeLetter = '';
    this.nextRoundTimeout = 10000;
    this.playAgain = [];
  }

  get instance() {
    return this;
  }
  get roomOptions() {
    const {
      playersMax,
      id,
      owner,
      admin,
      state,
      scoreboard,
      players,
      winners,
      createdAt,
      timePerRound,
      roundNumber,
      activeLetter,
      nextRoundTimeout,
      playAgain
    } = this;
    return {
      playersMax,
      id,
      owner,
      admin,
      state,
      scoreboard,
      players,
      winners,
      createdAt,
      timePerRound,
      roundNumber,
      activeLetter,
      nextRoundTimeout,
      playAgain
    };
  }

  setState(newState) {
    this.state = newState;
  }

  setWinners() {
    this.winners = Object.entries(this.scoreboard).reduce(
      (winners, [id, score]) => {
        if (score >= this.maxScore) {
          winners.push(id);
        }
        return winners;
      },
      []
    );
    return this.winners;
  }

  async connectPlayer(playerData: Object) {
    const newPlayerData = { ...playerData };
    if (this.owner === playerData.id) {
      newPlayerData.state = 1;
    }
    this.players.push(newPlayerData);
    return this.players;
  }

  disconnectPlayer(id: string) {
    return (this.players = this.players.filter((player: any) => {
      return player.id !== id;
    }));
  }

  getRoomObjectForUpdate(action = '') {
    const { id } = this;
    if (!id || !action) {
      throw Error(
        `Cannot create room object without room instance (${id}) or action (${action})`
      );
    }
    return {
      id,
      this: this,
      action,
    };
  }
}
