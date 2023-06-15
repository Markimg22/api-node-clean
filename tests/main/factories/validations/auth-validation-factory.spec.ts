import { makeAuthValidation } from '@/main/factories';
import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

jest.mock('@/utils/validation/validation-composite');

describe('AuthValidation Factory', () => {
  it('shoul call ValidationComposite with all validations', () => {
    makeAuthValidation();
    const validations: Validation[] = [];
    for (const field of ['token']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
