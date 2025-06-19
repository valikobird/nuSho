import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, hashPassword } from '../utils/passwordUtils';
import { UserDocument } from '../interfaces';
import { UnauthenticatedError } from '../errors/customErrors';
import { createJwt } from '../utils/tokenUtils';
import { setHttpCookie } from '../utils/httpUtils';

const register = async (req: Request, res: Response): Promise<void> => {
  req.body.password = await hashPassword(req.body.password);

  await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user registered successfully' });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const user: UserDocument = await getUser(req.body.email);
  await checkPassword(req.body.password, user.password);

  const token = createJwt({
    userId: user.id,
    role: user.role,
  });
  setHttpCookie(res, { name: 'token', value: token });

  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};

const logout = async (req: Request, res: Response): Promise<void> => {
  setHttpCookie(res, { name: 'token', value: null, lifeSpan: 0 });
  res.status(StatusCodes.OK).json({ msg: 'logout successful' });
};

const getUser = async (email: string): Promise<UserDocument> => {
  const user: UserDocument | null = await UserModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('incorrect credentials');
  }
  return user;
};

const checkPassword = async (
  formPassword: string,
  userPassword: string
): Promise<boolean> => {
  const isPasswordCorrect = await comparePassword(formPassword, userPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('incorrect credentials');
  }
  return isPasswordCorrect;
};

export { login, logout, register };
