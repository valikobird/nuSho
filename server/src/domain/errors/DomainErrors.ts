export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class AuthorizationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class BusinessRuleViolationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
