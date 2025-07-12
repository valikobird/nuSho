import type { Application } from 'express';
import request from 'supertest';

export const loginUser = async (app: Application, email: string, password: string) => {
  const response = await request(app).post('/api/v1/auth/login').send({ email, password });

  return response.headers['set-cookie'];
};
