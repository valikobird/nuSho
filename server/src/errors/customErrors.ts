import { CustomErrorWithStatus } from './types';
import { StatusCodes } from 'http-status-codes';

class CustomError extends Error implements CustomErrorWithStatus {
  statusCode: StatusCodes;
  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: any) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
