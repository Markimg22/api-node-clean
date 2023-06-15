import { adaptRoute } from '@/main/adapters';
import {
  makeCreateTaskController,
  makeLoadTasksController,
  makeUpdateTaskController,
  makeDeleteTaskController,
} from '@/main/factories';
import { auth } from '@/main/middlewares';

import { Router } from 'express';

export default (router: Router): void => {
  router.post('/tasks', auth, adaptRoute(makeCreateTaskController()));
  router.get('/tasks', auth, adaptRoute(makeLoadTasksController()));
  router.put('/tasks', auth, adaptRoute(makeUpdateTaskController()));
  router.delete('/tasks', auth, adaptRoute(makeDeleteTaskController()));
};
