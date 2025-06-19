import { User } from '@shared/interfaces';
import { Document } from 'mongoose';

export interface UserDocument extends User, Document {}

export interface CookieDetails {
  name: string;
  value: any;
  lifeSpan?: number;
}
