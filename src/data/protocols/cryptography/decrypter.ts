export interface Decrypter {
  decrypt: (params: Decrypter.Params) => Promise<Decrypter.Result>;
}

export namespace Decrypter {
  export type Params = {
    cipherText: string;
    secret: string;
  };
  export type Result = {
    sub: string;
    name: string;
    avatarUrl?: string;
  } | null;
}
