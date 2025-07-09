import type { TokenPayload, TokenService } from '../../domain/ports/TokenService';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class JwtTokenService implements TokenService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  }
}
