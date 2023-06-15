import { Format } from '@/utils/protocols';

export class FormatHourStringToMinutes implements Format<string, number> {
  format(hourString: string): number {
    if (!hourString.includes(':')) {
      return 0;
    }
    const [hours, minutes] = hourString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return 0;
    }
    const minutesAmount = hours * 60 + minutes;
    return minutesAmount;
  }
}
