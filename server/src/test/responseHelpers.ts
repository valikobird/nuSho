import type request from 'supertest';
import { expect } from 'vitest';

export const expectUnauthorizedError = (response: request.Response) => {
  expect(response.status).toBe(401);
  expect(response.body).toHaveProperty('msg');
};

export const expectValidationError = (response: request.Response, msgPart?: string) => {
  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty('msg');
  if (msgPart) {
    expect(response.body.msg.toLowerCase()).toContain(msgPart.toLowerCase());
  }
};

export const expectNotFoundError = (response: request.Response) => {
  expect(response.status).toBe(404);
  expect(response.body).toHaveProperty('msg');
};
