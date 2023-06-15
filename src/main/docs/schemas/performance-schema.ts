export const performanceSchema = {
  type: 'object',
  properties: {
    totalTimeOfFocus: {
      type: 'string',
    },
    totalTimeOfRest: {
      type: 'string',
    },
    totalTimeImportantTasks: {
      type: 'string',
    },
    totalTimeUrgentTasks: {
      type: 'string',
    },
    focusTimePercentage: {
      type: 'number',
    },
    percentageImportantTasks: {
      type: 'number',
    },
    percentageNotImportantTasks: {
      type: 'number',
    },
  },
};
