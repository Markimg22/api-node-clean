import { FormatDatetimeToFormattedDate } from '@/utils/formats';

const makeSut = (): FormatDatetimeToFormattedDate => {
  const sut = new FormatDatetimeToFormattedDate();
  return sut;
};

describe('Format DatetimeToFormattedDate', () => {
  it('should return formatted date DD/MM/YYYY if receive datetime', () => {
    const sut = makeSut();
    const datetime = new Date('2000-12-22');
    const formattedDate = sut.format(datetime);
    expect(formattedDate).toBe('22/12/2000');
  });

  it('should return datetime string if param not Date', () => {
    const sut = makeSut();
    const formattedDate = sut.format('22/02/2000');
    expect(formattedDate).toBe('22/02/2000');
  });

  it('should throw if invalid date is provied', () => {
    const sut = makeSut();
    expect(() => sut.format('123')).toThrow();
    expect(() => sut.format('12/22')).toThrow();
  });
});
