export type TaskModel = {
  id: string;
  emoji?: string;
  title: string;
  description?: string;
  completed: boolean;
  important: boolean;
  urgent: boolean;
  dailyTask: boolean;
  startDate?: Date | string;
  endDate?: Date | string;
};
