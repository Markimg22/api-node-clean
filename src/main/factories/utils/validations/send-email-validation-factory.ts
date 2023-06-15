import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@/utils/validation';
import { Validation } from '@/presentation/protocols';
import { EmailValidatorAdapter } from '@/infra/validators';

export const makeSendEmailValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'typeMail']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
