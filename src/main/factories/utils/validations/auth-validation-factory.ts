import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

export const makeAuthValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['token']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
