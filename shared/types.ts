import { USER_ROLES } from '@shared/constants';
import { UserDocument } from 'nusho_server/src/types/interfaces';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type UserDocumentWithoutPassword = Omit<UserDocument, 'password'>;
