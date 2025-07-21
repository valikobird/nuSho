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

const mockUserUseCases = {
  registerUser: vi.fn(),
  loginUser: vi.fn().mockResolvedValue({ token: 'mock-jwt-token' }),
  getUserById: vi.fn(),
  getUserTokenData: vi.fn().mockReturnValue({ userId: '507f1f77bcf86cd799439011' }),
};

const mockContainer = {
  getUserUseCases: vi.fn().mockReturnValue(mockUserUseCases),
  getAccountUseCases: vi.fn().mockReturnValue({
    getEnabledAccountsByUser: vi.fn(),
    createAccount: vi.fn(),
    getUserAccountById: vi.fn(),
  }),
  getAccountBalanceUseCases: vi.fn().mockReturnValue({
    createAccountBalance: vi.fn(),
  }),
};

vi.mock('../infrastructure/Container', () => ({
  Container: {
    getInstance: vi.fn().mockReturnValue(mockContainer),
  },
}));

vi.mock('../infrastructure/adapters/BcryptPasswordService', () => ({
  BcryptPasswordService: vi.fn().mockImplementation(() => {
    const passwordStore = new Map();
    return {
      hash: vi.fn().mockImplementation(async (password: string) => {
        const hash = `$2b$10$${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        passwordStore.set(hash, password);
        return hash;
      }),
      compare: vi.fn().mockImplementation(async (password: string, hash: string) => {
        if (hash === '' || password === '') {
          return false;
        }

        const storedPassword = passwordStore.get(hash);
        if (storedPassword !== undefined) {
          return password === storedPassword;
        }

        return password === 'password123' && hash.startsWith('$2b$10$');
      }),
    };
  }),
}));

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
      create: vi.fn().mockImplementation((userData) => ({
        _id: new mockObjectId(),
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
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
    create: vi.fn().mockImplementation((userData) => ({
      _id: new mockObjectId(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
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
