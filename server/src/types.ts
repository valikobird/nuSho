import { User } from '@shared/interfaces';

export type UserWithoutPassword = Omit<User, 'password'> & {
  id: string;
};
