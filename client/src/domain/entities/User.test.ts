import { describe, it, expect } from 'vitest';
import { User } from './User';
import type { UserInfoNoPassword } from '../ports/UserRepository.ts';

describe('User Entity', () => {
  describe('constructor', () => {
    it('should create a User instance with all properties', () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
      };

      const user = new User(userData.id, userData.name, userData.email, userData.createdAt, userData.updatedAt);

      expect(user.id).toBe(userData.id);
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.createdAt).toBe(userData.createdAt);
      expect(user.updatedAt).toBe(userData.updatedAt);
    });
  });

  describe('getDisplayName', () => {
    it('should return name when available', () => {
      const user = new User('1', 'John Doe', 'john@example.com', new Date('2023-01-01'), new Date('2023-01-02'));

      expect(user.getDisplayName()).toBe('John Doe');
    });

    it('should return email prefix when name is empty', () => {
      const user = new User('1', '', 'john@example.com', new Date('2023-01-01'), new Date('2023-01-02'));

      expect(user.getDisplayName()).toBe('john');
    });
  });

  describe('fromApiResponse', () => {
    it('should create User from API response', () => {
      const apiData = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      } satisfies UserInfoNoPassword;

      const user = User.fromApiResponse(apiData);

      expect(user.id).toBe(apiData.id);
      expect(user.name).toBe(apiData.name);
      expect(user.email).toBe(apiData.email);
      expect(user.createdAt).toEqual(new Date(apiData.createdAt));
      expect(user.updatedAt).toEqual(new Date(apiData.updatedAt));
    });
  });
});
