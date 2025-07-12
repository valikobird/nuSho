import { describe, it, expect } from 'vitest';
import type { UserInfoNoPassword } from '../ports/UserRepository';
import { User } from './User';

describe('User Entity', () => {
  describe('constructor', () => {
    it('should create a User instance with all properties', () => {
      const userData = {
        id: '1',
        name: '  John Doe  ',
        email: 'john@example.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      } satisfies UserInfoNoPassword;

      const user = new User(userData.id, userData.name, userData.email, userData.createdAt, userData.updatedAt);

      expect(user.id).toBe(userData.id);
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.createdAt).toBe(userData.createdAt);
      expect(user.updatedAt).toBe(userData.updatedAt);
    });
  });

  describe('create', () => {
    it('should create user data object without timestamps', () => {
      const name = 'Jane Doe';
      const email = 'jane@example.com';

      const userData = User.create(name, email);

      expect(userData).toEqual({ name, email });
    });

    it('should handle empty name', () => {
      const name = '';
      const email = 'test@example.com';

      const userData = User.create(name, email);

      expect(userData.name).toBe('');
      expect(userData.email).toBe(email);
    });

    it('should trim whitespace from name and email', () => {
      const name = '  Test User  ';
      const email = '  TEST@EXAMPLE.COM  ';

      const userData = User.create(name, email);

      expect(userData.name).toBe(name.trim());
      expect(userData.email).toBe(email.trim());
    });
  });
});
