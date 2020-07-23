import { IUser } from './user.interface';

import { Schema, Document, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

export interface IUserModel extends IUser, Document {
  validPassword(password: string): any;
}

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

User.plugin(mongooseUniqueValidator);

User.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.hash);
};

User.virtual('password').set(function (value: any) {
  this.hash = bcrypt.hashSync(value, 12);
});

export default model<IUserModel & Document>('User', User);
