import dotenv from 'dotenv';
dotenv.config();
import { env } from './config/env';

import express, { Request, Response } from 'express';
const app = express();

import morgan from 'morgan';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import connectDb from './db/connect';

// routers
import authRouter from './routes/authRouter';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

const morganMode: string = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganMode));
app.use(helmet());
app.use(express.json());

app.get('/health', (req: Request, res: Response): void => {
  res
    .status(StatusCodes.OK)
    .json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRouter);

app.all(/.*/, (req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'route not found' });
});

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
