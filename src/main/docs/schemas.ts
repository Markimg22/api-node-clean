import {
  userSchema,
  errorSchema,
  taskSchema,
  tasksSchema,
  createTaskParamsSchema,
  updateTaskParamsSchema,
  deleteTaskParamsSchema,
  sendEmailParamsSchema,
  performanceSchema,
  updatePerformanceParamsSchema,
  tokensSchema,
  messageSchema,
} from './schemas/';

export default {
  user: userSchema,
  task: taskSchema,
  tasks: tasksSchema,
  createTaskParams: createTaskParamsSchema,
  updateTaskParams: updateTaskParamsSchema,
  deleteTaskParams: deleteTaskParamsSchema,
  error: errorSchema,
  sendEmailParams: sendEmailParamsSchema,
  message: messageSchema,
  performance: performanceSchema,
  updatePerformanceParams: updatePerformanceParamsSchema,
  tokens: tokensSchema,
};
