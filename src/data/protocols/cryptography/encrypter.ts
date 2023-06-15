export interface Encrypter {
  encrypt: (payload: Encrypter.Params) => Promise<Encrypter.Result>;
}

export namespace Encrypter {
  export type Params = {
    payload: string | object | Buffer;
    secret: string;
    expiresIn?: string;
    subject?: string;
  };
  export type Result = string;
}
