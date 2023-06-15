import {
  HttpResponse,
  HttpStatusCode,
  Services,
} from '@/presentation/protocols';
import { ServerError, NotFoundError } from '@/presentation/errors';
import { logger } from '@/utils/log';

export const badRequest = (error: Error, service?: Services): HttpResponse => {
  logger.error(`badRequest: {
    service: ${service},
    statusCode: ${HttpStatusCode.BAD_REQUEST},
    body: ${error.stack}
  }`);
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: error,
  };
};

export const forbidden = (error: Error, service?: Services): HttpResponse => {
  logger.error(`forbidden: {
    service: ${service},
    statusCode: ${HttpStatusCode.FORBIDDEN},
    body: ${error.stack}
  }`);
  return {
    statusCode: HttpStatusCode.FORBIDDEN,
    body: error,
  };
};

export const ok = (data: any, service?: Services): HttpResponse => {
  logger.info(`ok: {
    service: ${service},
    statusCode: ${HttpStatusCode.OK},
    body: ${JSON.stringify(data)}
  }`);
  return {
    statusCode: HttpStatusCode.OK,
    body: data,
  };
};

export const serverError = (error: Error, service?: Services): HttpResponse => {
  logger.error(`serverError: {
    service: ${service},
    statusCode: ${HttpStatusCode.SERVER_ERROR},
    body: ${error.message}
  }`);
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: new ServerError(error.stack as string),
  };
};

export const notFound = (service?: Services): HttpResponse => {
  logger.error(`notFound: {
    service: ${service},
    statusCode: ${HttpStatusCode.NOT_FOUND},
    body: ${new NotFoundError()}
  }`);
  return {
    statusCode: HttpStatusCode.NOT_FOUND,
    body: new NotFoundError(),
  };
};
