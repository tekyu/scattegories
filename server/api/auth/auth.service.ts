import config from '../../config';
import { randomBytes } from 'crypto';
import logger from '../../loaders/logger';
import UserModel from '../../user/user.model';
import { IUserInputDTO, IUserLoginDTO } from '../../user/user.interface';
import passport from '../middlewares/passport';

export default class AuthService {
  logger: any;
  constructor() {
    this.logger = logger;
    this.signUp = this.signUp.bind(this);
  }

  public async signUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: any; token: string }> {
    try {
      const userRecord = await UserModel.create(userInputDTO);
      const { username, email, _id: id } = userRecord.toObject();
      console.log('singup service', username, email, id);
      return { user: { username, email, id }, token: 'test' };
    } catch (e) {
      throw e;
    }
  }

  // public async signIn(
  //   userLoginDTO: IUserLoginDTO,
  //   req: any
  // ): Promise<{ user: any; token: string }> {
  //   try {
  //     return passport.authenticate('local', (err, user, info) => {
  //       console.log('login', err, user, info);
  //       return user;
  //     })(req);
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
