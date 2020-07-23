import IPlayer from './player.interface';

interface ICreatePlayer {
  id: string;
  username: string;
  state?: number;
}

export default class Player implements IPlayer {
  id: string;
  username: string;
  answers: Array<Object>;
  state: number;

  constructor({ id, username, state }: ICreatePlayer) {
    this.id = id;
    this.username = username;
    this.answers = [];
    this.state = state || 0;
  }

  get instance() {
    return this;
  }

  get player() {
    return {
      id: this.id,
      username: this.username,
      state: this.state,
    };
  }

  setState(newState) {
    this.state = newState;
  }

  setAnswers(answers) {
    this.answers = answers;
  }
}
