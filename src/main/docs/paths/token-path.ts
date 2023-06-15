export const tokenPath = {
  put: {
    tags: ['Token'],
    summary: 'Refresh token',
    description: 'This route can be run by **any user**.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              refreshToken: {
                type: 'string',
              },
            },
            required: ['refreshToken'],
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
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
