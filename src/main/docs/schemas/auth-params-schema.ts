export const authParamsSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
  required: ['token'],
};
