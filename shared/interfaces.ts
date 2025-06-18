import { UserRole } from '@shared/types';

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface userDetails {
  userId: string;
  role: UserRole;
}
