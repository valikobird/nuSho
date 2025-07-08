import { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../../domain/errors/DomainErrors';
import { HttpError } from '../errors/HttpErrors';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);

  if (err instanceof DomainError) {
    const httpError = HttpError.fromDomainError(err);
    res.status(httpError.statusCode).json({ msg: httpError.message });
    return;
  }

  const msg: string = err.message || 'Something went wrong, try again later';
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg });
};

export default errorHandlerMiddleware;
