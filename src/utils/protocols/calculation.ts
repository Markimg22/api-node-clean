export interface Calculation<P = any, R = any> {
  calculate: (param: P) => R;
}

export namespace Calculation {
  export type ParamsPercentage = {
    totalAmount: number;
    valueToFind: number;
  };
}
