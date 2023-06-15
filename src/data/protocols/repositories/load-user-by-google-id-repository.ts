import { UserModel } from '@/domain/models';

export interface LoadUserByGoogleIdRepository {
  load: (
    googleId: LoadUserByGoogleIdRepository.Params
  ) => Promise<LoadUserByGoogleIdRepository.Result>;
}

export namespace LoadUserByGoogleIdRepository {
  export type Params = string;
  export type Result = UserModel | null;
}
