export const sendEmailParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'example@mail.com',
    },
    typeMail: {
      type: 'string',
      enum: ['WELCOME_EMAIL', 'ANY'],
    },
  },
  required: ['email', 'typeMail'],
};
