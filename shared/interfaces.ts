import { AccountType, UserRole } from '@shared/types';

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDetails {
  userId: string;
  role: UserRole;
}

export interface Account {
  name: string;
  type: AccountType;
  currencyCode: string;
  linkedTo: Account;
  createdBy: User;
  enabled: boolean;
}
