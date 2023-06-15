import { HttpClient } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http';

export const makeHttpClient = (): HttpClient => {
  return new AxiosHttpClient();
};
