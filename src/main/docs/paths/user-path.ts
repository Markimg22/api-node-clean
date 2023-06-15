export const userPath = {
  post: {
    tags: ['User'],
    summary: 'Auth a user',
    description: 'This route can be run by **any user**.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              token: {
                type: 'string',
              },
            },
            required: ['token'],
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                tokens: {
                  $ref: '#/schemas/tokens',
                },
                user: {
                  $ref: '#/schemas/user',
                },
              },
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
