import { ACCOUNT_TYPES, USER_ROLES } from '@shared/constants';
import { UserDocument } from 'nusho_server/src/types/interfaces';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type AccountType = (typeof ACCOUNT_TYPES)[keyof typeof ACCOUNT_TYPES];

export type UserDocumentWithoutPassword = Omit<UserDocument, 'password'>;
