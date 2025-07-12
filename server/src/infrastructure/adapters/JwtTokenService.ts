import type { TokenPayload, TokenService } from '../../domain/ports/TokenService';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class JwtTokenService implements TokenService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }

  verifyToken(token: string): JwtPayload | string {
    return jwt.verify(token, env.JWT_SECRET);
  }
}
