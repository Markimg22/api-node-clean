import { Format } from '@/utils/protocols';

export class FormatMinutesToHourString implements Format<number, string> {
  format(minutesAmount: number): string {
    const hours = Math.floor(minutesAmount / 60);
    const minutes = Math.floor(minutesAmount % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`;
  }
}
