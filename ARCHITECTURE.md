# nuSho Application Architecture

## Overview

**nuSho** is a full-stack financial management application designed to provide users with a finance overview with minimal effort. The application follows a clean architecture pattern with clear separation of concerns and implements hexagonal architecture principles.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       Client                            │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Presentation Layer                     ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    ││
│  │  │   Pages     │ │ Components  │ │   Utils     │    ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘    ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Application Layer                      ││
│  │  ┌─────────────┐                                    ││
│  │  │  Use Cases  │                                    ││
│  │  └─────────────┘                                    ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Infrastructure Layer                   ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌──────────────┐   ││
│  │  │  Adapters   │ │ Http Client │ │ Notifications│   ││
│  │  └─────────────┘ └─────────────┘ └──────────────┘   ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
                       HTTP/REST
                           │
┌─────────────────────────────────────────────────────────┐
│                       Server                            │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Presentation Layer                     ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    ││
│  │  │ Controllers │ │ Middleware  │ │   Routes    │    ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘    ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Application Layer                      ││
│  │  ┌─────────────┐                                    ││
│  │  │  Use Cases  │                                    ││
│  │  └─────────────┘                                    ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │                Domain Layer                         ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    ││
│  │  │  Entities   │ │    Ports    │ │   Errors    │    ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘    ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────┐│
│  │              Infrastructure Layer                   ││
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    ││
│  │  │  Adapters   │ │ Database    │ │   Config    │    ││
│  │  └─────────────┘ └─────────────┘ └─────────────┘    ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                           │
                       MongoDB
                           │
┌─────────────────────────────────────────────────────────┐
│                    Database                             │
│  ┌─────────────────────────────────────────────────────┐│
│  │  Users  │  Accounts  │  AccountBalances             ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend (Client)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM 7
- **Styling**: Styled Components
- **State Management**: React hooks and context
- **Notifications**: React Toastify
- **UI Icons**: React Icons
- **Currency Handling**: Currency Codes

### Backend (Server)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **Validation**: Express Validator + Zod
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: TSX for TypeScript execution

### Development Tools
- **Monorepo**: npm workspaces
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript
- **Process Management**: Concurrently
- **Build**: Vite for both client and server

## Project Structure

### Monorepo Structure
```
nuSho/
├── client/                 # React frontend application
├── server/                 # Express backend application
├── package.json           # Root package.json with workspaces
├── tsconfig.json          # Root TypeScript configuration
├── .gitignore            # Git ignore rules
├── .prettierrc           # Prettier configuration
├── README.md             # Project documentation
├── LICENSE               # Business Source License 1.1
└── ARCHITECTURE.md       # This file
```

### Client Architecture (React)

```
client/src/
├── application/
│   ├── usecases/          # Business logic for client-side operations
│   │   ├── AccountUseCases.ts
│   │   └── UserUseCases.ts
│   └── utils.ts           # Application utilities
├── domain/
│   ├── entities/          # Domain entities
│   │   ├── Account.ts
│   │   └── User.ts
│   └── ports/             # Interface definitions
│       ├── AccountRepository.ts
│       ├── NotificationService.ts
│       └── UserRepository.ts
├── infrastructure/
│   ├── adapters/          # External service adapters
│   │   ├── ApiAccountRepository.ts
│   │   ├── ApiUserRepository.ts
│   │   ├── HttpClient.ts
│   │   └── ToastNotificationService.ts
│   ├── Container.ts       # Dependency injection container
│   └── types.ts          # Infrastructure types
├── presentation/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components with routing
│   ├── utils/           # Presentation utilities
│   └── types.ts         # Presentation types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

### Server Architecture (Express)

```
server/src/
├── application/
│   └── usecases/          # Business logic use cases
│       ├── AccountBalanceUseCases.ts
│       ├── AccountUseCases.ts
│       └── UserUseCases.ts
├── domain/
│   ├── entities/          # Domain entities
│   │   ├── Account.ts
│   │   ├── AccountBalance.ts
│   │   └── User.ts
│   ├── ports/             # Interface definitions
│   │   ├── AccountBalanceRepository.ts
│   │   ├── AccountRepository.ts
│   │   ├── PasswordService.ts
│   │   ├── TokenService.ts
│   │   └── UserRepository.ts
│   └── errors/            # Domain-specific errors
│       └── DomainErrors.ts
├── infrastructure/
│   ├── adapters/          # External service adapters
│   │   ├── BcryptPasswordService.ts
│   │   ├── JwtTokenService.ts
│   │   ├── MongoAccountBalanceRepository.ts
│   │   ├── MongoAccountRepository.ts
│   │   └── MongoUserRepository.ts
│   ├── config/            # Configuration files
│   │   ├── database.ts
│   │   └── env.ts
│   ├── persistence/       # Database models
│   │   └── models/
│   │       ├── AccountBalanceModel.ts
│   │       ├── AccountModel.ts
│   │       └── UserModel.ts
│   └── Container.ts       # Dependency injection container
├── presentation/
│   └── web/               # Web layer components
│       ├── controllers/   # HTTP controllers
│       ├── middleware/    # Express middleware
│       ├── routes/        # Route definitions
│       └── errors/        # HTTP error handling
├── index.ts               # Application entry point
└── express.d.ts           # Express type augmentation
```

## Core Components

### Domain Entities

#### User Entity
- **Properties**: id, name, email, createdAt, updatedAt
- **Responsibilities**: User identity and basic information
- **Business Rules**: Email uniqueness, name validation

#### Account Entity
- **Properties**: id, name, type, currencyCode, createdBy, enabled, createdAt, updatedAt, linkedTo
- **Responsibilities**: Financial account management
- **Business Rules**: Account ownership, type validation, currency handling

#### AccountBalance Entity
- **Properties**: id, accountId, amount, recordedAt
- **Responsibilities**: Account balance tracking
- **Business Rules**: Balance consistency, historical tracking

### Use Cases

#### Client-Side Use Cases
- **UserUseCases**: User registration, login, profile management
- **AccountUseCases**: Account creation, listing, management

#### Server-Side Use Cases
- **UserUseCases**: User authentication, authorization, profile operations
- **AccountUseCases**: Account CRUD operations, ownership validation
- **AccountBalanceUseCases**: Balance tracking, historical data management

### Infrastructure Adapters

#### Client Adapters
- **ApiUserRepository**: HTTP client for user operations
- **ApiAccountRepository**: HTTP client for account operations
- **HttpClient**: Generic HTTP client wrapper
- **ToastNotificationService**: Toast notification implementation

#### Server Adapters
- **MongoUserRepository**: MongoDB implementation for user data
- **MongoAccountRepository**: MongoDB implementation for account data
- **MongoAccountBalanceRepository**: MongoDB implementation for balance data
- **BcryptPasswordService**: Password hashing service
- **JwtTokenService**: JWT token generation and validation

## API Design

### Authentication
- **POST** `/api/v1/auth/register` - User registration
- **POST** `/api/v1/auth/login` - User login
- **GET** `/api/v1/auth/logout` - User logout

### User Management
- **GET** `/api/v1/users/profile` - Get user profile

### Account Management
- **GET** `/api/v1/accounts` - List user enabled accounts
- **POST** `/api/v1/accounts` - Create new account
- **POST** `/api/v1/accounts/:id/balance` - Set account balance

## Data Flow

### Authentication Flow
1. User submits credentials through login form
2. Client sends POST request to `/api/v1/auth/login`
3. Server validates credentials using `UserUseCases`
4. Server generates JWT token using `JwtTokenService`
5. Server sets HTTP-only cookie with token
6. Client redirects to dashboard

### Account Management Flow
1. User accesses account management through UI
2. Client calls `AccountUseCases` methods
3. Use cases call `ApiAccountRepository` methods
4. Repository makes HTTP requests to server
5. Server processes through middleware and controllers
6. Server calls `AccountUseCases` with domain logic
7. Use cases interact with `MongoAccountRepository`
8. Response flows back through the layers

## Security Considerations

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **Password Hashing**: Bcrypt for secure password storage
- **Route Protection**: Middleware-based route protection

### Data Protection
- **Input Validation**: Express Validator
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet Security**: HTTP security headers
- **Environment Variables**: Secure configuration management and validation with Zod

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Accounts Collection
```typescript
{
  _id: ObjectId,
  name: string,
  type: 'checking' | 'savings' | 'credit' | 'investment',
  currencyCode: string,
  createdBy: ObjectId,
  enabled: boolean,
  linkedTo?: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### AccountBalances Collection
```typescript
{
  _id: ObjectId,
  accountId: ObjectId,
  amount: number,
  recordedAt: Date
}
```

## Deployment Architecture

### Development Environment
- **Client**: Vite development server (port 5173)
- **Server**: Express server with tsx watch mode (port 5100)
- **Database**: Remote MongoDB instance
- **Concurrency**: Both client and server run simultaneously

### Production Environment
- **Client**: Static files served by Express server
- **Server**: Compiled JavaScript running on Node.js
- **Database**: Production MongoDB instance
- **Security**: HTTPS, environment-based configuration

## Build and Deployment

### Build Process
1. **Client Build**: TypeScript compilation + Vite bundling
2. **Server Build**: TypeScript compilation to JavaScript
3. **Static Assets**: Client build output served by server

### Scripts
- `npm run dev` - Start both client and server in development
- `npm run build` - Build both client and server for production
- `npm run start` - Start production server
- `npm run lint` - Lint both workspaces
- `npm run lint:fix` - Fix linting issues

## Error Handling

### Client-Side Error Handling
- **React Error Boundaries**: Catch and display component errors
- **Toast Notifications**: User-friendly error messages
- **Form Validation**: Client-side input validation
- **HTTP Error Handling**: Graceful API error responses

### Server-Side Error Handling
- **Centralized Error Middleware**: Global error handling
- **Domain Error Types**: Business logic error definitions
- **HTTP Status Codes**: Appropriate response codes
- **Error Logging**: Comprehensive error tracking

## Performance Considerations (to be attended)

### Client Performance
- **Code Splitting**: Route-based code splitting
- **React Optimization**: Proper component memoization
- **Bundle Size**: Optimized production builds
- **Lazy Loading**: Component and route lazy loading

### Server Performance
- **Database Indexing**: Optimized MongoDB queries
- **Caching Strategy**: Response caching where appropriate
- **Compression**: Gzip compression for responses
- **Connection Pooling**: Efficient database connections

## Testing Strategy (to be attended)

### Client Testing
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API integration testing
- **E2E Tests**: User flow testing

### Server Testing
- **Unit Tests**: Use case and entity testing
- **Integration Tests**: Repository and adapter testing
- **API Tests**: Endpoint testing with database

## Future Enhancements

### Planned Features
- **Transaction Management**: Income and expense tracking
- **Budget Planning**: Budget creation and monitoring
- **Financial Reports**: Analytics and reporting
- **Mobile Application**: React Native mobile app

### Technical Improvements
- **Automated Testing**: Comprehensive test coverage

## Conclusion

The nuSho application follows clean architecture principles with clear separation of concerns, making it maintainable, testable, and scalable. The hexagonal architecture approach ensures that the business logic is independent of external concerns, while the monorepo structure facilitates shared development and deployment processes.
