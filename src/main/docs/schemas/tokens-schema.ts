export const tokensSchema = {
  type: 'object',
  properties: {
    refreshToken: {
      type: 'string',
    },
    accessToken: {
      type: 'string',
    },
  },
  required: ['refreshToken', 'accessToken'],
};
