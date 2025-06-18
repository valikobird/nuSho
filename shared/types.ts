import { USER_ROLES } from '@shared/constants';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
