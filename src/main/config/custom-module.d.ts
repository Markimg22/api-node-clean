/* eslint-disable no-unused-vars */

// eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
declare module Express {
  interface Request {
    userId?: string;
  }
}
