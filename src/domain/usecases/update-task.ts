export interface UpdateTask {
  update: (params: UpdateTask.Params) => Promise<UpdateTask.Result>;
}

export namespace UpdateTask {
  export type Params = {
    id: string;
    userId: string;
    emoji?: string;
    title?: string;
    description?: string;
    completed?: boolean;
    important?: boolean;
    urgent?: boolean;
    dailyTask?: boolean;
    startDate?: Date;
    endDate?: Date;
  };
  export type Result = boolean;
}
