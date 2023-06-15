export interface CreateTask {
  create: (params: CreateTask.Params) => Promise<CreateTask.Result>;
}

export namespace CreateTask {
  export type Params = {
    userId: string;
    emoji?: string;
    title: string;
    description?: string;
    important: boolean;
    urgent: boolean;
    dailyTask: boolean;
    startDate?: Date;
    endDate?: Date;
  };
  export type Result = void;
}
