import { User } from '@shared/interfaces';
import { Document } from 'mongoose';
import { UserDocumentWithoutPassword } from '@shared/types';

export interface UserDocument extends User, Document {
  json(): UserDocumentWithoutPassword;
}

export interface CookieDetails {
  name: string;
  value: any;
  lifeSpan?: number;
}
