import { Format } from '@/utils/protocols';

export class FormatDatetimeToFormattedDate
  implements Format<Date | string, string>
{
  format(datetime: Date | string): string {
    if (datetime instanceof Date) {
      const formattedDate = datetime
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/');
      return formattedDate;
    }
    const reg =
      /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (!reg.test(datetime)) {
      throw new Error('Invalid date is provided');
    }
    return datetime;
  }
}
