import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';

class AuthController {
  service: any;

  constructor(service) {
    this.service = new service();
    this.signUp = this.signUp.bind(this);
    // this.signIn = this.signIn.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    const { username, email } = await this.service.signUp(req.body);
    console.log('signUp', { username, email });
    return res.status(200).send({ username, email });
  }

  // async signIn(req: Request, res: Response, next: NextFunction) {
  //   const { username, email } = await this.service.signIn(req.body, req);
  //   console.log('signIn', req.body, { username, email });
  //   return res.status(200).json({ username, email });
  // }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    console.log('forgotPassword', req.body);
  }
}

export default new AuthController(AuthService);
