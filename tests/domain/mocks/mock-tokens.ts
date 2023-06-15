import { CreateTokens } from '@/domain/usecases';

import faker from '@faker-js/faker';

export const mockCreateTokensParams = (): CreateTokens.Params => ({
  name: faker.internet.userName(),
  avatarUrl: faker.internet.avatar(),
  subject: faker.datatype.uuid(),
});
