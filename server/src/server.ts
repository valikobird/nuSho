import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import * as process from 'node:process';

import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.all(/.*/, (req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}
