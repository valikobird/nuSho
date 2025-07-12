import { beforeEach, vi } from 'vitest';

vi.mock('../infrastructure/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    JWT_SECRET: 'test-jwt-secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    MONGO_URL: 'mongodb://localhost:27017/test',
    PORT: 5100,
  },
}));

// Mock ObjectId constructor function
const mockObjectId = Object.assign(
  vi.fn().mockImplementation((id?: string) => {
    return {
      toString: () => id || '507f1f77bcf86cd799439011',
      valueOf: () => id || '507f1f77bcf86cd799439011',
    };
  }),
  {
    isValid: vi.fn().mockReturnValue(true),
  }
);

vi.mock('mongoose', () => ({
  default: {
    connect: vi.fn(),
    connection: {
      dropDatabase: vi.fn(),
      close: vi.fn(),
      collections: {},
    },
    Schema: vi.fn().mockImplementation(() => ({
      index: vi.fn(),
      pre: vi.fn(),
      post: vi.fn(),
      methods: {},
      statics: {},
    })),
    model: vi.fn().mockReturnValue({
      find: vi.fn(),
      findOne: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      findByIdAndUpdate: vi.fn(),
      findByIdAndDelete: vi.fn(),
    }),
    Types: {
      ObjectId: mockObjectId,
    },
  },
  connect: vi.fn(),
  connection: {
    dropDatabase: vi.fn(),
    close: vi.fn(),
    collections: {},
  },
  Schema: vi.fn().mockImplementation(() => ({
    index: vi.fn(),
    pre: vi.fn(),
    post: vi.fn(),
    methods: {},
    statics: {},
  })),
  model: vi.fn().mockReturnValue({
    find: vi.fn(),
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  }),
  Types: {
    ObjectId: mockObjectId,
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});
