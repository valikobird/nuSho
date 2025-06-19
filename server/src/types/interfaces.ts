import { User } from '@shared/interfaces';
import { Document } from 'mongoose';
import { UserWithoutPassword } from './common';

export interface UserDocument extends User, Document {
  json(): UserWithoutPassword;
}

export interface CookieDetails {
  name: string;
  value: any;
  lifeSpan?: number;
}
