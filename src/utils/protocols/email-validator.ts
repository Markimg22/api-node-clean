export interface EmailValidator {
  isValid: (email: EmailValidator.Params) => EmailValidator.Result;
}

export namespace EmailValidator {
  export type Params = string;
  export type Result = boolean;
}
