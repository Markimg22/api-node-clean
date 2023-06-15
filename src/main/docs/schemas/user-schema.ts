export const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    avatarUrl: {
      type: 'string',
    },
  },
  required: ['name', 'avatarUrl'],
};
