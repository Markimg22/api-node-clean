import { UserModel } from '@/domain/models';

export interface AuthenticationUser {
  auth: (
    params: AuthenticationUser.Params
  ) => Promise<AuthenticationUser.Result>;
}

export namespace AuthenticationUser {
  export type Params = {
    token: string;
  };
  export type Result = {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: UserModel;
  } | null;
  export type UserInfoFromGoogle = {
    id: string;
    name: string;
    email: string;
    picture: string;
  } | null;
}
