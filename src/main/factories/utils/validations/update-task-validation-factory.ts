import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

export const makeUpdateTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
