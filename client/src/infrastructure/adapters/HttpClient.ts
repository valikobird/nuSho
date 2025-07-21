import type { GeneralApiResponse } from '../types';

const BASE_PATH_API_V1 = '/api/v1';

export class HttpClient {
  constructor(private readonly baseUrl: string = BASE_PATH_API_V1) {}

  async post<T = GeneralApiResponse>(path: string, data: unknown, options: RequestInit = {}): Promise<T> {
    return await this.fetchJson<T>(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
  }

  async get<T = GeneralApiResponse>(path: string, options: RequestInit = {}): Promise<T> {
    return await this.fetchJson<T>(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }

  private async fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(path, options);

    let errorMessage: string;
    try {
      if (response.ok) {
        return (await response.json()) satisfies T;
      }

      const errorBody = await response.json();
      errorMessage = errorBody.msg || errorBody.message || JSON.stringify(errorBody);
    } catch {
      errorMessage = 'Error occurred while fetching json';
    }

    throw new Error(errorMessage);
  }
}
