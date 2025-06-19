import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserDetails } from '@shared/interfaces';

export const createJwt = (payload: UserDetails): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyJwt = (token: string): UserDetails => {
  return jwt.verify(token, env.JWT_SECRET) as UserDetails;
};
