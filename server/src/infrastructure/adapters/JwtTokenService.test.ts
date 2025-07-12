import { beforeEach, describe, it, expect, vi } from 'vitest';
import { JwtTokenService } from './JwtTokenService';
import type { TokenPayload } from '../../domain/ports/TokenService';
import type { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { parseExpirationToSeconds } from '../../test/jwtTokenHelpers';

describe('JwtTokenService', () => {
  let tokenService: JwtTokenService;

  beforeEach(() => {
    tokenService = new JwtTokenService();
  });

  describe('generate token', () => {
    it('should generate JWT token successfully', () => {
      const payload = { userId: 'user123' } satisfies TokenPayload;
      const token = tokenService.generateToken(payload);

      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts separated by dots
    });

    it('should generate different tokens for different payloads', () => {
      const payload1 = { userId: 'user123' } satisfies TokenPayload;
      const payload2 = { userId: 'user456' } satisfies TokenPayload;

      const token1 = tokenService.generateToken(payload1);
      const token2 = tokenService.generateToken(payload2);

      expect(token1).not.toBe(token2);
    });
  });

  describe('verify token', () => {
    it('should verify valid token successfully', () => {
      const payload = { userId: 'user123' } satisfies TokenPayload;
      const token = tokenService.generateToken(payload);

      const decoded = tokenService.verifyToken(token);

      expect(decoded).toBeTruthy();
      expect(typeof decoded).toBe('object');
      expect((decoded as TokenPayload).userId).toBe(payload.userId);
      expect((decoded as JwtPayload).iat).toBeDefined();
      expect((decoded as JwtPayload).exp).toBeDefined();
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => {
        tokenService.verifyToken(invalidToken);
      }).toThrow();
    });

    it('should throw error for malformed token', () => {
      const malformedToken = 'not-a-jwt-token';

      expect(() => {
        tokenService.verifyToken(malformedToken);
      }).toThrow();
    });

    it('should throw error for empty token', () => {
      expect(() => {
        tokenService.verifyToken('');
      }).toThrow();
    });

    it('should validate token expiration time is set correctly', () => {
      const payload = { userId: 'user123' } satisfies TokenPayload;
      const token = tokenService.generateToken(payload);
      const decoded = tokenService.verifyToken(token) as JwtPayload;

      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();

      const expirationDiff = decoded.exp! - decoded.iat!;
      const expectedExpiration = parseExpirationToSeconds(env.JWT_EXPIRES_IN);
      expect(expirationDiff).toBe(expectedExpiration);
    });

    it('should reject expired token (manual creation)', () => {
      const pastTime = Math.floor(Date.now() / 1000) - 1000; // 1000 seconds ago
      const payload = {
        userId: 'user123',
        iat: pastTime - 2,
        exp: pastTime,
      };

      const expiredToken = jwt.sign(payload, env.JWT_SECRET, { noTimestamp: true });

      expect(() => {
        tokenService.verifyToken(expiredToken);
      }).toThrow('jwt expired');
    });

    it('should not reject token that will expire soon using clock tolerance', () => {
      const now = Math.floor(Date.now() / 1000);
      const expectedExpiration = parseExpirationToSeconds(env.JWT_EXPIRES_IN);

      const almostExpiredPayload = {
        userId: 'user123',
        iat: now - (expectedExpiration - 1),
        exp: now + 1,
      };
      const almostExpiredToken = jwt.sign(almostExpiredPayload, env.JWT_SECRET, { noTimestamp: true });

      expect(() => {
        tokenService.verifyToken(almostExpiredToken);
      }).not.toThrow();
    });
  });
});
