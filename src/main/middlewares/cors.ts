import { Request, Response, NextFunction } from 'express';

import { env } from '@/main/config/env';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', env.accessUrl);
  res.set('access-control-allow-headers', '*');
  res.set('access-control-allow-methods', '*');
  next();
};
