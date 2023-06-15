import { HttpClient, HttpRequest } from '@/data/protocols/http';
import { HttpResponse } from '@/presentation/protocols';
import { logger } from '@/utils/log';

import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: any) {
      logger.error(`AxiosHttpCient: ${error}`);
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
