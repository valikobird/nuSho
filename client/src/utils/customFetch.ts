import { BASE_PATH_API_V1 } from '@shared/constants';
import type { User } from '@shared/interfaces';
import type { GeneralApiResponse } from '../interfaces.ts';

const registerUser = async (data: User): Promise<GeneralApiResponse> => {
  return await fetchApiV1<GeneralApiResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

async function fetchApiV1<T>(path: string, options?: RequestInit): Promise<T> {
  return fetchJson(`${BASE_PATH_API_V1}${path}`, options);
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);

  let errorMessage: string;
  try {
    if (response.ok) {
      return response.json();
    }

    const errorBody = await response.json();
    errorMessage =
      errorBody.msg || errorBody.message || JSON.stringify(errorBody);
  } catch {
    errorMessage = 'Error occurred while fetching json';
  }

  throw new Error(errorMessage);
}

export { registerUser };
