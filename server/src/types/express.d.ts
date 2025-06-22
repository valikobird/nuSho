import { UserDetails } from '@shared/interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: UserDetails;
    }
  }
}
