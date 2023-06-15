export interface SendEmail {
  send: (email: SendEmail.Params) => Promise<SendEmail.Result>;
}

export namespace SendEmail {
  export type Params = string;
  export type Result = boolean;
}
