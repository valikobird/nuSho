import type { UserDocumentWithoutPassword } from '@shared/types.ts';
import type { Account } from '@shared/interfaces.ts';

export interface GlobalContextType {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

export interface ActionProps {
  request: Request;
}

export interface GeneralApiResponse {
  msg: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  user: UserDocumentWithoutPassword;
}

export interface AccountsResponse {
  accounts: Account[];
}
