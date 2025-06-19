import { Response } from 'express';
import { CookieDetails } from '../interfaces';
import { env } from '../config/env';

export const setHttpCookie = (res: Response, details: CookieDetails): void => {
  const oneDay = 1000 * 60 * 60 * 24;
  const lifeSpan = details.lifeSpan || oneDay;

  res.cookie(details.name, details.value, {
    httpOnly: true,
    expires: new Date(Date.now() + lifeSpan),
    secure: env.NODE_ENV === 'production',
  });
};
