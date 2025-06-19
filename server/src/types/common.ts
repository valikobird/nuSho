import { User } from '@shared/interfaces';
import { StatusCodes } from 'http-status-codes';

export type UserWithoutPassword = Omit<User, 'password'> & {
  id: string;
};

export type CustomErrorWithStatus = Error & { statusCode: StatusCodes };
