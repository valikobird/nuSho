// services
import { BcryptPasswordService } from './adapters/BcryptPasswordService';
import { JwtTokenService } from './adapters/JwtTokenService';

// repositories
import { MongoUserRepository } from './adapters/MongoUserRepository';
import { MongoAccountRepository } from './adapters/MongoAccountRepository';
import { MongoAccountBalanceRepository } from './adapters/MongoAccountBalanceRepository';

// use cases
import { UserUseCases } from '../application/usecases/UserUseCases';
import { AccountUseCases } from '../application/usecases/AccountUseCases';
import { AccountBalanceUseCases } from '../application/usecases/AccountBalanceUseCases';

export class Container {
  private static instance: Container;
  private readonly userUseCases: UserUseCases;
  private readonly accountUseCases: AccountUseCases;
  private readonly accountBalanceUseCases: AccountBalanceUseCases;

  private constructor() {
    const userRepository = new MongoUserRepository();
    const accountRepository = new MongoAccountRepository();
    const accountBalanceRepository = new MongoAccountBalanceRepository();

    const passwordService = new BcryptPasswordService();
    const tokenService = new JwtTokenService();

    this.userUseCases = new UserUseCases(userRepository, passwordService, tokenService);
    this.accountUseCases = new AccountUseCases(accountRepository);
    this.accountBalanceUseCases = new AccountBalanceUseCases(accountBalanceRepository, this.accountUseCases);
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  getUserUseCases(): UserUseCases {
    return this.userUseCases;
  }

  getAccountUseCases(): AccountUseCases {
    return this.accountUseCases;
  }

  getAccountBalanceUseCases(): AccountBalanceUseCases {
    return this.accountBalanceUseCases;
  }
}
