import { EmailValidator } from '@/utils/protocols';

import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: EmailValidator.Params): EmailValidator.Result {
    return validator.isEmail(email);
  }
}
