import { HttpClient, HttpMethod, HttpRequest } from '@/data/protocols/http';
import { HttpResponse, HttpStatusCode } from '@/presentation/protocols';

import faker from '@faker-js/faker';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: ['get', 'post', 'put', 'delete'][
    Math.floor(Math.random() * 4)
  ] as HttpMethod,
  body: faker.datatype.json(),
  headers: faker.datatype.json(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
