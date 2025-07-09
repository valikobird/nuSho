import { StatusCodes } from 'http-status-codes';
import type { DomainError } from '../../../domain/errors/DomainErrors';
import {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  BusinessRuleViolationError,
} from '../../../domain/errors/DomainErrors';

export class HttpError extends Error {
  statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }

  static fromDomainError(domainError: DomainError): HttpError {
    if (domainError instanceof ValidationError || domainError instanceof BusinessRuleViolationError) {
      return new HttpError(domainError.message, StatusCodes.BAD_REQUEST);
    }

    if (domainError instanceof AuthenticationError) {
      return new HttpError(domainError.message, StatusCodes.UNAUTHORIZED);
    }

    if (domainError instanceof AuthorizationError) {
      return new HttpError(domainError.message, StatusCodes.FORBIDDEN);
    }

    if (domainError instanceof NotFoundError) {
      return new HttpError(domainError.message, StatusCodes.NOT_FOUND);
    }

    return new HttpError(domainError.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
