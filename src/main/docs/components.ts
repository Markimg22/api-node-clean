import { apiKeyAuthSchema } from './schemas/';
import { badRequest, serverError, notFound, forbidden } from './components/';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  notFound,
  forbidden,
};
