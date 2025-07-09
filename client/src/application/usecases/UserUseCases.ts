import type { UserRepository, LoginCredentials, UserRegisterData } from '../../domain/ports/UserRepository';
import type { NotificationService } from '../../domain/ports/NotificationService';
import type { User } from '../../domain/entities/User';
import { handleError } from '../utils';

export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private notificationService: NotificationService
  ) {}

  async register(userData: UserRegisterData): Promise<void> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Please enter a valid email address');
    }

    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    try {
      await this.userRepository.register(userData);
      this.notificationService.showSuccess('Registration successful');
    } catch (error) {
      handleError(error, 'Registration failed', this.notificationService);
    }
  }

  async login(credentials: LoginCredentials): Promise<void> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    if (!this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }

    try {
      await this.userRepository.login(credentials);
      this.notificationService.showSuccess('Login successful');
    } catch (error) {
      handleError(error, 'Login failed', this.notificationService);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.userRepository.logout();
      this.notificationService.showSuccess('Logout successful');
    } catch (error) {
      handleError(error, 'Logout failed', this.notificationService);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      return await this.userRepository.getCurrentUser();
    } catch (error) {
      handleError(error, 'Failed to get user', this.notificationService);
      throw error;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
