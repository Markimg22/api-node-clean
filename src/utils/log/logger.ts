import { env } from '@/main/config/env';

import pino from 'pino';

export const logger = pino({
  enabled: env.logEnabled === 'true',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
