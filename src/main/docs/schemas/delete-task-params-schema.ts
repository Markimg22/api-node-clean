export const deleteTaskParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '',
    },
  },
  required: ['id'],
};
