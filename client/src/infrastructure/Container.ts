import { UserUseCases } from '../application/usecases/UserUseCases';
import { AccountUseCases } from '../application/usecases/AccountUseCases';
import { ApiUserRepository } from './adapters/ApiUserRepository';
import { ApiAccountRepository } from './adapters/ApiAccountRepository';
import { ToastNotificationService } from './adapters/ToastNotificationService';

export class Container {
  private static instance: Container;
  private userUseCases: UserUseCases;
  private accountUseCases: AccountUseCases;

  private constructor() {
    const userRepository = new ApiUserRepository();
    const accountRepository = new ApiAccountRepository();

    const notificationService = new ToastNotificationService();

    this.userUseCases = new UserUseCases(userRepository, notificationService);
    this.accountUseCases = new AccountUseCases(accountRepository, notificationService);
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
}
