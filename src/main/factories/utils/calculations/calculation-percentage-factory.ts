import { CalculationPercentage } from '@/utils/calculations';
import { Calculation } from '@/utils/protocols';

export const makeCalculationPercentage = (): Calculation<
  Calculation.ParamsPercentage,
  number
> => {
  return new CalculationPercentage();
};
