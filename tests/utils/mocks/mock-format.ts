import { Format } from '@/utils/protocols';

import faker from '@faker-js/faker';

export class FormatMinutesToHourStringSpy implements Format<number, string> {
  params: number[] = [];
  result = '';

  format(param: number): string {
    this.params.push(param);
    this.result = String(param);
    return this.result;
  }
}

export class FormatHourStringToMinutesSpy implements Format<string, number> {
  params: string[] = [];
  result = faker.datatype.number();

  format(param: string): number {
    this.params.push(param);
    return this.result;
  }
}

export class FormatDatetimeToFormattedDateSpy
  implements Format<Date | string, string>
{
  params: Array<Date | string> = [];
  result = faker.datatype
    .datetime()
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');

  format(param: Date | string): string {
    this.params.push(param);
    return this.result;
  }
}
