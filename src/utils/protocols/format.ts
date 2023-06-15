export interface Format<P = any, R = any> {
  format: (param: P) => R;
}
