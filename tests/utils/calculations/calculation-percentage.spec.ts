import { CalculationPercentage } from '@/utils/calculations';

const makeSut = (): CalculationPercentage => {
  const sut = new CalculationPercentage();
  return sut;
};

describe('Calculation Percentage', () => {
  it('should return percentage correctly', () => {
    const sut = makeSut();
    const percentage = sut.calculate({ totalAmount: 31412, valueToFind: 1122 });
    expect(percentage).toBe(3);
  });

  it('should return 0 if totalAmount < 0', () => {
    const sut = makeSut();
    const percentage = sut.calculate({ totalAmount: -1123, valueToFind: 1 });
    expect(percentage).toBe(0);
  });

  it('should return 0 if valueToFind < 0', () => {
    const sut = makeSut();
    const percentage = sut.calculate({ totalAmount: 1210, valueToFind: -1000 });
    expect(percentage).toBe(0);
  });

  it('should return 0 if totalAmount == 0 or valueToFind == 0', () => {
    const sut = makeSut();
    const percentage = sut.calculate({ totalAmount: 0, valueToFind: 0 });
    expect(percentage).toBe(0);
  });

  it('should return 0 if totalAmount < valueToFind', () => {
    const sut = makeSut();
    const percentage = sut.calculate({ totalAmount: 10, valueToFind: 1000 });
    expect(percentage).toBe(0);
  });
});
