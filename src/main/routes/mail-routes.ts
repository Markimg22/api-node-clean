import { adaptRoute } from '@/main/adapters';
import { makeSendEmailController } from '@/main/factories';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/mail', adaptRoute(makeSendEmailController()));
};
