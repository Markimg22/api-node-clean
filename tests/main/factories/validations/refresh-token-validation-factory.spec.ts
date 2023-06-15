import { makeRefreshTokenValidation } from '@/main/factories';
import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

jest.mock('@/utils/validation/validation-composite');

describe('RefreshTokenValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeRefreshTokenValidation();
    const validations: Validation[] = [];
    for (const field of ['refreshToken']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
