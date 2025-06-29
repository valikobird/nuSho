import { AccountType, UserDocumentWithoutPassword, UserRole } from '@shared/types';
import { Document } from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends User, Document {
  json(): UserDocumentWithoutPassword;
}

export interface UserDetails {
  userId: string;
  role: UserRole;
}

export interface Account {
  _id?: string;
  name: string;
  type: AccountType;
  currencyCode: string;
  linkedTo: Account;
  createdBy: User;
  enabled: boolean;
}
