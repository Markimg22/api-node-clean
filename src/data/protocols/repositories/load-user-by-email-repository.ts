export interface LoadUserByEmailRepository {
  load: (
    email: LoadUserByEmailRepository.Params
  ) => Promise<LoadUserByEmailRepository.Result>;
}

export namespace LoadUserByEmailRepository {
  export type Params = string;
  export type Result = {
    id: string;
    name: string;
    email: string;
    googleId: string;
    avatarUrl?: string;
  } | null;
}
