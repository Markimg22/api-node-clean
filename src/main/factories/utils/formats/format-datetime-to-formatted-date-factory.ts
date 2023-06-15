import { FormatDatetimeToFormattedDate } from '@/utils/formats';
import { Format } from '@/utils/protocols';

export const makeFormatDatetimeToFormattedDate = (): Format<
  Date | string,
  string
> => {
  return new FormatDatetimeToFormattedDate();
};
