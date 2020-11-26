export default interface ICreateRoomOptions {
  playersMax: number;
  maxScore: number;
  username: string;
  categories: Array<string>;
  timePerRound: number;
  timeWaiting: number;
}
