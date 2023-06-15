export const taskSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    emoji: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
    important: {
      type: 'boolean',
    },
    urgent: {
      type: 'boolean',
    },
    dailyTask: {
      type: 'boolean',
    },
    startDate: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
  },
};
