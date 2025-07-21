import type { Request, Response } from 'express';
import { Container } from '../../../infrastructure/Container';
import type { UserLoginInput, UserRegisterInput } from '../../../domain/ports/UserRepository';
import { env } from '../../../infrastructure/config/env';
import { StatusCodes } from 'http-status-codes';

export interface CookieDetails {
  name: string;
  value: unknown;
  lifeSpan?: number;
}

const userUseCases = Container.getInstance().getUserUseCases();

export const register = async (req: Request, res: Response): Promise<void> => {
  const userRegisterInput = req.body satisfies UserRegisterInput;
  const { token } = await userUseCases.registerUser(userRegisterInput);
  setHttpCookie(res, { name: 'token', value: token });
  res.status(StatusCodes.CREATED).json({ msg: 'user registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const userLoginInput = req.body satisfies UserLoginInput;
  const { token } = await userUseCases.loginUser(userLoginInput);
  setHttpCookie(res, { name: 'token', value: token });
  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  setHttpCookie(res, { name: 'token', value: '', lifeSpan: 0 });
  res.status(StatusCodes.OK).json({ msg: 'logout successful' });
};

const setHttpCookie = (res: Response, details: CookieDetails): void => {
  const oneDay = 1000 * 60 * 60 * 24;
  const lifeSpan = details.lifeSpan || oneDay;

  res.cookie(details.name, details.value, {
    httpOnly: true,
    expires: new Date(Date.now() + lifeSpan),
    secure: env.NODE_ENV === 'production',
  });
};
