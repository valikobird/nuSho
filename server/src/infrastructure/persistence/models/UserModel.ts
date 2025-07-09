import { model, Schema } from 'mongoose';
import type { UserInfo } from '../../../domain/ports/UserRepository';

const UserSchema = new Schema<UserInfo>(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

export default model('User', UserSchema);
