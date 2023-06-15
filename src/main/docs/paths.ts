import {
  taskPath,
  mailPath,
  performancePath,
  tokenPath,
  userPath,
} from './paths/';

export default {
  '/user': userPath,
  '/task': taskPath,
  '/mail/send-email': mailPath,
  '/performance': performancePath,
  '/token': tokenPath,
};
