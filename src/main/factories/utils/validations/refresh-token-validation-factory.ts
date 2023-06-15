import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

export const makeRefreshTokenValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['refreshToken']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
