export interface CheckUserByEmailRepository {
  check: (
    email: CheckUserByEmailRepository.Params
  ) => Promise<CheckUserByEmailRepository.Result>;
}

export namespace CheckUserByEmailRepository {
  export type Params = string;
  export type Result = boolean;
}
