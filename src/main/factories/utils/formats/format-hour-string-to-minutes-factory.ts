import { FormatHourStringToMinutes } from '@/utils/formats';
import { Format } from '@/utils/protocols';

export const makeFormatHourStringToMinutes = (): Format<string, number> => {
  return new FormatHourStringToMinutes();
};
