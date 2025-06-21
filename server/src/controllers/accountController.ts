import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AccountModel from '../models/AccountModel';
import { UnauthenticatedError } from '../errors/customErrors';

const createAccount = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new UnauthenticatedError('User is not logged in');
  }

  req.body.createdBy = req.user.userId;

  await AccountModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'account created successfully' });
};

const getEnabledAccounts = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthenticatedError('User is not logged in');
  }

  const accounts = await AccountModel.find({
    createdBy: req.user.userId,
    enabled: true,
  });
  res.status(StatusCodes.OK).json({ accounts });
};

export { createAccount, getEnabledAccounts };
