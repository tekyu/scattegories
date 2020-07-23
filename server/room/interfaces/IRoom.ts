export default interface IRoom {
  playersMax: number;
  categories: Array<String>;
  maxScore: number;
  id: string;
  owner: string;
  admin: string;
  state: number; // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended
  stage: number; // 0 - idle | 1 - choosing | 2 - writing | 3 - waiting | 4 - checking | 5 - summary | 6 - ended
  players: Array<Object>;
  winners: Array<String>;
  createdAt: number;
  chat: Array<Object>;
  scoreboard: Object;
}
