import { beforeEach, describe, it, expect } from 'vitest';
import { BcryptPasswordService } from './BcryptPasswordService';

describe('BcryptPasswordService', () => {
  let passwordService: BcryptPasswordService;

  beforeEach(() => {
    passwordService = new BcryptPasswordService();
  });

  describe('hash', () => {
    it('should hash password successfully', async () => {
      const password = 'password123';
      const hashedPassword = await passwordService.hash(password);

      expect(hashedPassword).toBeTruthy();
      expect(hashedPassword).not.toBe(password);
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'password123';
      const hash1 = await passwordService.hash(password);
      const hash2 = await passwordService.hash(password);

      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty password', async () => {
      const password = '';
      const hashedPassword = await passwordService.hash(password);

      expect(hashedPassword).toBeTruthy();
      expect(typeof hashedPassword).toBe('string');
    });
  });

  describe('compare', () => {
    it('should return true for correct password', async () => {
      const password = 'password123';
      const hashedPassword = await passwordService.hash(password);

      const isValid = await passwordService.compare(password, hashedPassword);

      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'password123';
      const wrongPassword = 'wrongpassword';
      const hashedPassword = await passwordService.hash(password);

      const isValid = await passwordService.compare(wrongPassword, hashedPassword);

      expect(isValid).toBe(false);
    });

    it('should return false for empty password against hash', async () => {
      const password = 'password123';
      const hashedPassword = await passwordService.hash(password);

      const isValid = await passwordService.compare('', hashedPassword);

      expect(isValid).toBe(false);
    });

    it('should handle empty hash', async () => {
      const password = 'password123';

      const isValid = await passwordService.compare(password, '');

      expect(isValid).toBe(false);
    });
  });
});
