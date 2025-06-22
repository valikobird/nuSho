import { BASE_PATH_API_V1 } from '@shared/constants';
import type { User } from '@shared/interfaces';
import type { AccountsResponse, GeneralApiResponse, LoginData, UserResponse } from '../interfaces';

const registerUser = async (data: User): Promise<GeneralApiResponse> => {
  return await apiPost('/auth/register', data);
};

const loginUser = async (data: LoginData): Promise<GeneralApiResponse> => {
  return await apiPost('/auth/login', data);
};

const logoutUser = async (): Promise<GeneralApiResponse> => {
  const response = await apiGet('/auth/logout');
  return response as GeneralApiResponse;
};

const getCurrentUser = async (): Promise<UserResponse | GeneralApiResponse> => {
  return await apiGet<UserResponse>('/users/current-user');
};

const getEnabledAccounts = async (): Promise<AccountsResponse | GeneralApiResponse> => {
  return await apiGet<AccountsResponse>('/accounts');
};

async function apiPost(path: string, data: User | LoginData, apiVersion: string = 'V1'): Promise<GeneralApiResponse> {
  if (apiVersion === 'V1') {
    return await fetchApiV1<GeneralApiResponse>(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  return {
    msg: `API version ${apiVersion} is not supported`,
  };
}

async function apiGet<T>(path: string, apiVersion: string = 'V1'): Promise<GeneralApiResponse | T> {
  if (apiVersion === 'V1') {
    return await fetchApiV1(path, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
  }

  return {
    msg: `API version ${apiVersion} is not supported`,
  };
}

async function fetchApiV1<T>(path: string, options?: RequestInit): Promise<T> {
  return fetchJson<T>(`${BASE_PATH_API_V1}${path}`, options);
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);

  let errorMessage: string;
  try {
    if (response.ok) {
      return await response.json();
    }

    const errorBody = await response.json();
    errorMessage = errorBody.msg || errorBody.message || JSON.stringify(errorBody);
  } catch {
    errorMessage = 'Error occurred while fetching json';
  }

  throw new Error(errorMessage);
}

export { getCurrentUser, getEnabledAccounts, loginUser, logoutUser, registerUser };
