import { FormatMinutesToHourString } from '@/utils/formats';
import { Format } from '@/utils/protocols';

export const makeMinutesToHourString = (): Format<number, string> => {
  return new FormatMinutesToHourString();
};
