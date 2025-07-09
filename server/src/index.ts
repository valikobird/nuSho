import dotenv from 'dotenv';
dotenv.config();
import { env } from './infrastructure/config/env';

import type { Request, Response } from 'express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

import morgan from 'morgan';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';
import connectDb from './infrastructure/config/database';
import { authRouter, userRouter, accountRouter } from './presentation/web/routes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_PATH_API_V1 = '/api/v1';

// middleware
import errorHandlerMiddleware from './presentation/web/middleware/errorHandlerMiddleware';
import { authenticateUser } from './presentation/web/middleware/authMiddleware';

const morganMode: string = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganMode));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

if (env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientPath));
}

app.get('/health', (req: Request, res: Response): void => {
  res.status(StatusCodes.OK).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(`${BASE_PATH_API_V1}/auth`, authRouter);
app.use(`${BASE_PATH_API_V1}/users`, authenticateUser, userRouter);
app.use(`${BASE_PATH_API_V1}/accounts`, authenticateUser, accountRouter);

if (env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response): void => {
    const clientPath = path.join(__dirname, '../../client/dist');
    res.sendFile(path.join(clientPath, 'index.html'));
  });
} else {
  app.all(/.*/, (req: Request, res: Response): void => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'route not found' });
  });
}

app.use(errorHandlerMiddleware);

await connectDb(env.MONGO_URL);

const port = env.PORT || 5100;
try {
  app.listen(port, (): void => {
    console.log(`Server is running on the port ${port}`);
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
