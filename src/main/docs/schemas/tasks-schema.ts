export const tasksSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/task',
  },
};
