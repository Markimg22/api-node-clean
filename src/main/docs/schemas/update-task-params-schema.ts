export const updateTaskParamsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: '',
    },
    emoji: {
      type: 'string',
      example: '',
    },
    title: {
      type: 'string',
      example: '',
    },
    description: {
      type: 'string',
      example: '',
    },
    completed: {
      type: 'boolean',
      default: false,
    },
    important: {
      type: 'boolean',
      default: false,
    },
    urgent: {
      type: 'boolean',
      default: false,
    },
    dailyTask: {
      type: 'boolean',
      default: false,
    },
    startDate: {
      type: 'string',
      default: 'DD/MM/YYYY',
    },
    endDate: {
      type: 'string',
      default: 'DD/MM/YYYY',
    },
  },
  required: ['id'],
};
