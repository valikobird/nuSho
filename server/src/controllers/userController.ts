import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import { StatusCodes } from 'http-status-codes';
import { UserDocument } from '../types/interfaces';
import { UserDocumentWithoutPassword } from '@shared/types';
import { UnauthenticatedError } from '../errors/customErrors';

export const getCurrentUser = async (req: Request, res: Response) => {
  const user: UserDocument | null = await UserModel.findById(req.user?.userId);
  if (!user) {
    throw new UnauthenticatedError('User is not logged in');
  }

  const userWithoutPassword: UserDocumentWithoutPassword = user.json();
  res.status(StatusCodes.OK).json({ ...userWithoutPassword });
};
