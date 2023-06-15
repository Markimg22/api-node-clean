import { FormatHourStringToMinutes } from '@/utils/formats';

const makeSut = (): FormatHourStringToMinutes => {
  const sut = new FormatHourStringToMinutes();
  return sut;
};

describe('Format HourStringToMinutes', () => {
  it('should return minutes if receive hour hh:mm', () => {
    const sut = makeSut();
    const minutesAmount = sut.format('02:05');
    expect(minutesAmount).toBe(125);
  });

  it('should return 0 if receive invalid param with not ":"', () => {
    const sut = makeSut();
    const result = sut.format('invalid_param');
    expect(result).toBe(0);
  });

  it('should return 0 if receive invalid param with not number', () => {
    const sut = makeSut();
    const result = sut.format('invalid:param');
    expect(result).toBe(0);
  });
});
