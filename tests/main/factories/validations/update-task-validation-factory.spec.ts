import { makeUpdateTaskValidation } from '@/main/factories';
import { Validation } from '@/presentation/protocols';
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/utils/validation';

jest.mock('@/utils/validation/validation-composite');

describe('UpdateTaskValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeUpdateTaskValidation();
    const validations: Validation[] = [];
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
