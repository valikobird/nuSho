import type { UserInfoNoPassword } from './domain/ports/UserRepository';

declare global {
  namespace Express {
    interface Request {
      user?: Partial<UserInfoNoPassword>;
    }
  }
}
