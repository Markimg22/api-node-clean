export const performancePath = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Performance'],
    summary: 'List performance',
    description: 'This route can only be run by **authenticated users**',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/performance',
            },
          },
        },
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Performance'],
    summary: 'Update performance',
    description: 'This route can only be run by **authenticated users**',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updatePerformanceParams',
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
              $ref: '#/schemas/performance',
            },
          },
        },
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
