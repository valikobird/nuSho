import { StatusCodes } from 'http-status-codes';

export type CustomErrorWithStatus = Error & { statusCode: StatusCodes };

class CustomError extends Error implements CustomErrorWithStatus {
  statusCode: StatusCodes;
  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
