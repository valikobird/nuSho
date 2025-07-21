import type { UserLoginInput, UserRegisterInput, UserRepository } from '../../domain/ports/UserRepository';
import { User } from '../../domain/entities/User';
import { AuthenticationError, NotFoundError, ValidationError } from '../../domain/errors/DomainErrors';
import type { PasswordService } from '../../domain/ports/PasswordService';
import type { TokenPayload, TokenService } from '../../domain/ports/TokenService';

export class UserUseCases {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async registerUser(userRegisterInput: UserRegisterInput): Promise<{ token: string }> {
    const { email, password, name } = userRegisterInput;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('User already exists');
    }

    const hashedPassword = await this.passwordService.hash(password);
    const userData = User.create(name, email);
    const user = await this.userRepository.create({ ...userData, password: hashedPassword });
    const token = this.tokenService.generateToken({ userId: user.id });
    return { token };
  }

  async loginUser(userLoginInput: UserLoginInput): Promise<{ token: string }> {
    const userWithPassword = await this.userRepository.findByEmailWithPassword(userLoginInput.email);
    if (!userWithPassword) {
      throw new NotFoundError('Invalid credentials');
    }

    const { user, password } = userWithPassword;
    const isPasswordValid = await this.passwordService.compare(userLoginInput.password, password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = this.tokenService.generateToken({ userId: user.id });
    return { token };
  }

  getUserTokenData(token: string): TokenPayload {
    const payload = this.tokenService.verifyToken(token);
    return { userId: payload.userId };
  }

  async getUserById(userId: string): Promise<User> {
    const user = (await this.userRepository.findById(userId)) satisfies User | null;
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}
