import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { UserUseCases } from './UserUseCases';
import type { UserLoginInput, UserRegisterInput, UserRepository } from '../../domain/ports/UserRepository';
import type { PasswordService } from '../../domain/ports/PasswordService';
import type { TokenService } from '../../domain/ports/TokenService';
import type { User } from '../../domain/entities/User';

describe('User use cases', () => {
  let userUseCases: UserUseCases;
  let mockUserRepository: {
    [K in keyof UserRepository]: MockedFunction<UserRepository[K]>;
  };
  let mockPasswordService: {
    [K in keyof PasswordService]: MockedFunction<PasswordService[K]>;
  };
  let mockTokenService: {
    [K in keyof TokenService]: MockedFunction<TokenService[K]>;
  };

  beforeEach(() => {
    mockUserRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findByEmailWithPassword: vi.fn(),
      findById: vi.fn(),
    };

    mockPasswordService = {
      hash: vi.fn(),
      compare: vi.fn(),
    };

    mockTokenService = {
      generateToken: vi.fn(),
      verifyToken: vi.fn(),
    };

    userUseCases = new UserUseCases(mockUserRepository, mockPasswordService, mockTokenService);
  });

  describe('register', () => {
    it('should register user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      } satisfies UserRegisterInput;

      const hashedPassword = 'hashedpassword123';
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockPasswordService.hash.mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockResolvedValue(mockUser);
      mockTokenService.generateToken.mockReturnValue('jwt-token');

      const result = await userUseCases.registerUser(userData);

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);

      expect(mockPasswordService.hash).toHaveBeenCalledWith(userData.password);

      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      });

      expect(mockTokenService.generateToken).toHaveBeenCalledWith({ userId: mockUser.id });

      expect(result).toEqual({ token: 'jwt-token' });
    });

    it('should throw error if user already exists', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const existingUser = {
        id: '1',
        name: 'Existing User',
        email: userData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(userUseCases.registerUser(userData)).rejects.toThrow('User already exists');
      expect(mockPasswordService.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123',
      } satisfies UserLoginInput;

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      } satisfies User;

      const hashedPassword = 'hashedpassword123';

      const mockResponse = {
        user: mockUser,
        password: hashedPassword,
      };

      mockUserRepository.findByEmailWithPassword.mockResolvedValue(mockResponse);
      mockPasswordService.compare.mockResolvedValue(true);
      mockTokenService.generateToken.mockReturnValue('jwt-token');

      const result = await userUseCases.loginUser(credentials);

      expect(mockUserRepository.findByEmailWithPassword).toHaveBeenCalledWith(credentials.email);

      expect(mockPasswordService.compare).toHaveBeenCalledWith(credentials.password, mockResponse.password);

      expect(mockTokenService.generateToken).toHaveBeenCalledWith({ userId: mockUser.id });

      expect(result).toEqual({ token: 'jwt-token' });
    });

    it('should throw error if user not found', async () => {
      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password123',
      } satisfies UserLoginInput;

      mockUserRepository.findByEmailWithPassword.mockResolvedValue(null);

      await expect(userUseCases.loginUser(credentials)).rejects.toThrow('Invalid credentials');

      expect(mockPasswordService.compare).not.toHaveBeenCalled();
      expect(mockTokenService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw error if password is incorrect', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'wrongpassword',
      } satisfies UserLoginInput;

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      } satisfies User;

      const mockResponse = {
        user: mockUser,
        password: 'hashedpassword123',
      };

      mockUserRepository.findByEmailWithPassword.mockResolvedValue(mockResponse);
      mockPasswordService.compare.mockResolvedValue(false);

      await expect(userUseCases.loginUser(credentials)).rejects.toThrow('Invalid credentials');
      expect(mockTokenService.generateToken).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should return user without password', async () => {
      const userId = '1';

      const mockUser = {
        id: userId,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } satisfies User;

      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userUseCases.getUserById(userId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);

      expect(result).toEqual(mockUser);
    });

    it('should throw error if user not found', async () => {
      const userId = 'nonexistent';

      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userUseCases.getUserById(userId)).rejects.toThrow('User not found');
    });
  });
});
