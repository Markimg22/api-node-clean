import { Calculation } from '@/utils/protocols';

export class CalculationPercentage
  implements Calculation<Calculation.ParamsPercentage, number>
{
  calculate({
    totalAmount,
    valueToFind,
  }: Calculation.ParamsPercentage): number {
    if (totalAmount <= 0 || valueToFind <= 0 || totalAmount < valueToFind) {
      return 0;
    }
    return Math.floor((100 * valueToFind) / totalAmount);
  }
}
