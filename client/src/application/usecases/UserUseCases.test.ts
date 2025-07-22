import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import type { LoginCredentials, UserRegisterData, UserRepository } from '../../domain/ports/UserRepository';
import { UserUseCases } from './UserUseCases';
import type { NotificationService } from '../../domain/ports/NotificationService';
import type { User } from '../../domain/entities/User';

describe('User Use Cases', () => {
  let userUseCases: UserUseCases;
  let mockUserRepository: {
    [K in keyof UserRepository]: MockedFunction<UserRepository[K]>;
  };
  let mockNotificationService: {
    [K in keyof NotificationService]: MockedFunction<NotificationService[K]>;
  };

  beforeEach(() => {
    mockUserRepository = {
      register: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn(),
    };

    mockNotificationService = {
      showSuccess: vi.fn(),
      showError: vi.fn(),
    };

    userUseCases = new UserUseCases(mockUserRepository, mockNotificationService);
  });

  describe('register', () => {
    describe('should validate required fields', () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      } satisfies UserRegisterData;

      const errorMsg = 'All fields are required';
      const error = new Error(errorMsg);

      it('should validate if any data is provided', async () => {
        const testUserData = {} as unknown as UserRegisterData;

        mockUserRepository.register.mockRejectedValue(error);

        await expect(userUseCases.register(testUserData)).rejects.toThrow(error);
      });

      it('should validate name is provided', async () => {
        const testUserData = { email: userData.email, password: userData.password } as unknown as UserRegisterData;

        mockUserRepository.register.mockRejectedValue(error);

        await expect(userUseCases.register(testUserData)).rejects.toThrow(errorMsg);
      });

      it('should validate email is provided', async () => {
        const testUserData = { name: userData.name, password: userData.password } as unknown as UserRegisterData;

        mockUserRepository.register.mockRejectedValue(error);

        await expect(userUseCases.register(testUserData)).rejects.toThrow(errorMsg);
      });

      it('should validate password is provided', async () => {
        const testUserData = { name: userData.name, email: userData.email } as unknown as UserRegisterData;

        mockUserRepository.register.mockRejectedValue(error);

        await expect(userUseCases.register(testUserData)).rejects.toThrow(errorMsg);
      });
    });

    it('should validate email format is correct', async () => {
      const userData = {
        name: 'John Doe',
        email: 'johnexample.com',
        password: 'password123',
      } satisfies UserRegisterData;
      const error = new Error('Please enter a valid email address');

      mockUserRepository.register.mockRejectedValue(error);

      await expect(userUseCases.register(userData)).rejects.toThrow(error);
    });

    it('should validate password length', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
      } satisfies UserRegisterData;
      const error = new Error('Password must be at least 8 characters long');

      mockUserRepository.register.mockRejectedValue(error);

      await expect(userUseCases.register(userData)).rejects.toThrow(error);
    });

    it('should register user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      } satisfies UserRegisterData;

      await userUseCases.register(userData);

      expect(mockUserRepository.register).toHaveBeenCalledWith(userData);
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Registration successful');
    });

    it('should handle registration failure', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const errorMsg = 'Email already exists';

      const error = new Error(errorMsg);
      mockUserRepository.register.mockRejectedValue(error);

      await expect(userUseCases.register(userData)).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('login', () => {
    describe('should validate required fields', () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
      } satisfies LoginCredentials;

      const errorMsg = 'Email and password are required';
      const error = new Error(errorMsg);

      it('should validate if any data is provided', async () => {
        const testUserData = {} as unknown as LoginCredentials;

        mockUserRepository.login.mockRejectedValue(error);

        await expect(userUseCases.login(testUserData)).rejects.toThrow(error);
      });

      it('should validate email is provided', async () => {
        const testUserData = { password: userData.password } as unknown as LoginCredentials;

        mockUserRepository.login.mockRejectedValue(error);

        await expect(userUseCases.login(testUserData)).rejects.toThrow(errorMsg);
      });

      it('should validate password is provided', async () => {
        const testUserData = { email: userData.email } as unknown as LoginCredentials;

        mockUserRepository.login.mockRejectedValue(error);

        await expect(userUseCases.login(testUserData)).rejects.toThrow(errorMsg);
      });
    });

    it('should validate email format is correct', async () => {
      const userData = {
        email: 'johnexample.com',
        password: 'password123',
      } satisfies LoginCredentials;
      const error = new Error('Please enter a valid email address');

      mockUserRepository.login.mockRejectedValue(error);

      await expect(userUseCases.login(userData)).rejects.toThrow(error);
    });

    it('should login user successfully', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123',
      } satisfies LoginCredentials;

      await userUseCases.login(credentials);

      expect(mockUserRepository.login).toHaveBeenCalledWith(credentials);
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Login successful');
    });

    it('should handle login failure', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'wrongpassword',
      } satisfies LoginCredentials;
      const errorMsg = 'Login failed';
      const error = new Error(errorMsg);

      mockUserRepository.login.mockRejectedValue(error);

      await expect(userUseCases.login(credentials)).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      await userUseCases.logout();

      expect(mockUserRepository.logout).toHaveBeenCalled();
      expect(mockNotificationService.showSuccess).toHaveBeenCalledWith('Logout successful');
    });

    it('should handle logout failure', async () => {
      const errorMsg = 'Logout failed';
      const error = new Error(errorMsg);

      mockUserRepository.logout.mockRejectedValue(error);

      await expect(userUseCases.logout()).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        getDisplayName: vi.fn(),
      } satisfies User;

      mockUserRepository.getCurrentUser.mockResolvedValue(mockUser);

      const result = await userUseCases.getCurrentUser();

      expect(mockUserRepository.getCurrentUser).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
      expect(mockNotificationService.showSuccess).not.toHaveBeenCalled();
    });

    it('should handle getCurrentUser failure', async () => {
      const errorMsg = 'Failed to get user';
      const error = new Error(errorMsg);

      mockUserRepository.getCurrentUser.mockRejectedValue(error);

      await expect(userUseCases.getCurrentUser()).rejects.toThrow(error);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });
  });
});
