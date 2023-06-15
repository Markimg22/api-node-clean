import { PrismaUpdatePerformanceRepository } from '@/infra/repositories';
import { UpdatePerformanceRepository } from '@/data/protocols/repositories';
import { client } from '@/infra/helpers';

import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';
import { User } from '@prisma/client';

const valueDefault = faker.datatype.number();

const makeSut = (): PrismaUpdatePerformanceRepository => {
  const sut = new PrismaUpdatePerformanceRepository(client);
  return sut;
};

describe('PrismaUpdatePerformance Repository', () => {
  let user: User;

  beforeAll(async () => {
    user = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
    await client.performance.create({
      data: {
        userId: user.id,
        minutesOfFocus: valueDefault,
        minutesOfRest: valueDefault,
        minutesOnImportantTasks: valueDefault,
        minutesOnUrgentTasks: valueDefault,
      },
    });
  });

  afterAll(async () => {
    await client.performance.deleteMany();
    await client.task.deleteMany();
    await client.user.deleteMany();
  });

  it('should update performance successfully', async () => {
    const sut = makeSut();
    const value = faker.datatype.number();
    await sut.update({
      userId: user.id,
      minutesOfFocus: value,
      minutesOfRest: value,
      minutesOnImportantTasks: value,
      minutesOnUrgentTasks: value,
    });
    const userPerformance = await client.performance.findUnique({
      where: { userId: user.id },
      select: {
        minutesOfFocus: true,
        minutesOfRest: true,
        minutesOnImportantTasks: true,
        minutesOnUrgentTasks: true,
      },
    });
    expect(userPerformance).toEqual({
      minutesOfFocus: valueDefault + value,
      minutesOfRest: valueDefault + value,
      minutesOnImportantTasks: valueDefault + value,
      minutesOnUrgentTasks: valueDefault + value,
    });
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.performance, 'update').mockImplementationOnce(throwError);
    const promise = sut.update({} as UpdatePerformanceRepository.Params);
    await expect(promise).rejects.toThrow();
  });
});
