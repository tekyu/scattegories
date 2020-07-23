export interface IUser {
  //   _id: string;
  hash: string;
  username: string;
  email: string;
  createdAt: number;
}

export interface IUserInputDTO {
  username: string;
  email: string;
  password: string;
}

export interface IUserLoginDTO {
  email: string;
  password: string;
}
