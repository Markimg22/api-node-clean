import { Calculation } from '@/utils/protocols';

import faker from '@faker-js/faker';

export class CalculationPercentageSpy
  implements Calculation<Calculation.ParamsPercentage, number>
{
  result = faker.datatype.number();
  params = [] as Calculation.ParamsPercentage[];

  calculate(params: Calculation.ParamsPercentage): number {
    this.params.push(params);
    return this.result;
  }
}
