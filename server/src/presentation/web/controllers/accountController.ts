import type { Request, Response } from 'express';
import { Container } from '../../../infrastructure/Container';
import { StatusCodes } from 'http-status-codes';
import type { AccountCreateInput } from '../../../domain/ports/AccountRepository';
import type { AccountBalanceCreateData } from '../../../domain/ports/AccountBalanceRepository';
import { AccountBalance } from '../../../domain/entities/AccountBalance';

const container = Container.getInstance();
const accountUseCases = container.getAccountUseCases();
const accountBalanceUseCases = container.getAccountBalanceUseCases();

export const createAccount = async (req: Request, res: Response): Promise<void> => {
  const accountCreateInput = req.body satisfies AccountCreateInput;
  await accountUseCases.createAccount(accountCreateInput, req.user!.id!);
  res.status(StatusCodes.CREATED).json({ msg: 'account created successfully' });
};

export const getEnabledAccounts = async (req: Request, res: Response): Promise<void> => {
  const accounts = await accountUseCases.getEnabledAccountsByUser(req.user!.id!);
  res.status(StatusCodes.OK).json({ accounts });
};

export const setAccountBalance = async (req: Request, res: Response): Promise<void> => {
  const accountBalanceInfo = AccountBalance.create({
    account: req.params.id,
    date: new Date(req.body.date),
    amount: req.body.amount,
    createdBy: req.user!.id!,
  }) satisfies AccountBalanceCreateData;

  await accountBalanceUseCases.createAccountBalance(accountBalanceInfo);
  res.status(StatusCodes.CREATED).json({ msg: 'Account balance changed successfully' });
};
