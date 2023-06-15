import { adaptRoute } from '@/main/adapters';
import { makeRefreshTokenController } from '@/main/factories';

import { Router } from 'express';

export default (router: Router): void => {
  router.put('/token', adaptRoute(makeRefreshTokenController()));
};
