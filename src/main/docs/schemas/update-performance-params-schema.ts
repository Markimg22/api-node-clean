export const updatePerformanceParamsSchema = {
  type: 'object',
  properties: {
    totalTimeOfFocus: {
      type: 'string',
      example: '00:00',
    },
    totalTimeOfRest: {
      type: 'string',
      example: '00:00',
    },
    totalTimeImportantTasks: {
      type: 'string',
      example: '00:00',
    },
    totalTimeUrgentTasks: {
      type: 'string',
      example: '00:00',
    },
  },
  required: [],
};
