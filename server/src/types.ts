import { User } from '@shared/interfaces';
import mongoose from 'mongoose';

export type UserWithoutPassword = Omit<User, 'password'> & {
  _id: mongoose.Types.ObjectId;
};
