export interface CreateTokens {
  create: (params: CreateTokens.Params) => Promise<CreateTokens.Result>;
}

export namespace CreateTokens {
  export type Params = {
    subject?: string;
    name: string;
    avatarUrl?: string;
  };
  export type Result = {
    refreshToken: string;
    accessToken: string;
  };
}
