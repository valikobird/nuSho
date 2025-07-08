import { AccountCreateData, AccountInfo, AccountRepository } from '../../domain/ports/AccountRepository';
import AccountModel from '../persistence/models/AccountModel';
import { Account } from '../../domain/entities/Account';
import mongoose, { Document } from 'mongoose';

interface AccountDocument extends Omit<AccountInfo, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

export class MongoAccountRepository implements AccountRepository {
  async findById(id: string): Promise<Account | null> {
    const accountDoc = (await AccountModel.findById(id)) satisfies AccountDocument | null;
    return accountDoc ? this.toDomainEntity(accountDoc as AccountDocument) : null;
  }

  async findByUserId(userId: string, isEnabled?: boolean): Promise<Account[]> {
    let query: { createdBy: string; enabled?: boolean } = { createdBy: userId };
    if (typeof isEnabled === 'boolean') {
      query['enabled'] = isEnabled;
    }

    const accountDocs = (await AccountModel.find(query)) satisfies AccountDocument[];
    return accountDocs.map((doc) => this.toDomainEntity(doc));
  }

  async create(accountData: AccountCreateData): Promise<Account> {
    const accountDoc = (await AccountModel.create(accountData)) satisfies AccountDocument;
    return this.toDomainEntity(accountDoc);
  }

  private toDomainEntity(accountDoc: AccountDocument): Account {
    return new Account(
      accountDoc._id.toString(),
      accountDoc.name,
      accountDoc.type,
      accountDoc.currencyCode,
      accountDoc.createdBy,
      accountDoc.enabled,
      accountDoc.createdAt,
      accountDoc.updatedAt,
      accountDoc.linkedTo
    );
  }
}
