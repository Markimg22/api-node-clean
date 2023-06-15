import { FormatMinutesToHourString } from '@/utils/formats';

const makeSut = (): FormatMinutesToHourString => {
  const sut = new FormatMinutesToHourString();
  return sut;
};

describe('Format MinutesToHourString', () => {
  it('should return hour string with format hh:mm if receive integer minutes amount', () => {
    const sut = makeSut();
    const hourString = sut.format(125);
    expect(hourString).toBe('02:05');
  });

  it('should return hour string with format hh:mm if receive float minutes amount', () => {
    const sut = makeSut();
    const hourString = sut.format(65.123);
    expect(hourString).toBe('01:05');
  });

  it('should return 00:00 if invalid param is provided', () => {
    const sut = makeSut();
    const hourString = sut.format(null as any);
    expect(hourString).toBe('00:00');
  });
});
