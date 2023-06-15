import { UserModel } from '@/domain/models';

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>;
}

export namespace CreateUser {
  export type Params = {
    name: string;
    email: string;
    googleId: string;
    avatarUrl?: string;
  };
  export type Result =
    | (UserModel & {
        id: string;
      })
    | null;
}
