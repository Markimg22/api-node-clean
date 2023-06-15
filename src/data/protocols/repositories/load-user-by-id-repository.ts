export interface LoadUserByIdRepository {
  load: (
    userId: LoadUserByIdRepository.Params
  ) => Promise<LoadUserByIdRepository.Result>;
}

export namespace LoadUserByIdRepository {
  export type Params = string;
  export type Result = {
    email: string;
    name: string;
  } | null;
}
