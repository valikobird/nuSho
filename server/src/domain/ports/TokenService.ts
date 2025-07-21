import type { JwtPayload } from 'jsonwebtoken';

export interface TokenService {
  generateToken(payload: TokenPayload): string;
  verifyToken(token: string): JwtPayload;
}

export interface TokenPayload {
  userId: string;
}
