import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/passwordUtils';
import { UserDocument } from '../interfaces';

export const register = async (req: Request, res: Response): Promise<void> => {
  req.body.password = await hashPassword(req.body.password);

  await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user registered successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const user: UserDocument | null = await UserModel.findOne({
    email: req.body.email,
  });

  res.status(StatusCodes.OK).json({ msg: 'login successful' });
};
