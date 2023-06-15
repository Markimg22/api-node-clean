export interface VerifyRefreshToken {
  verify: (
    refreshToken: VerifyRefreshToken.Params
  ) => Promise<VerifyRefreshToken.Result>;
}

export namespace VerifyRefreshToken {
  export type Params = string;
  export type Result = {
    id: string;
    name: string;
    avatarUrl?: string;
  } | null;
}
