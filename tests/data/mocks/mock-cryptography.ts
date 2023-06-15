import { Encrypter, Decrypter } from '@/data/protocols/cryptography';

import faker from '@faker-js/faker';

export class EncrypterSpy implements Encrypter {
  callsCount = 0;
  payloads: any[] = [];
  params: Encrypter.Params = {
    payload: {},
    secret: faker.datatype.uuid(),
  };
  cipherText = faker.datatype.uuid();

  async encrypt(params: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = params;
    this.payloads.push(params.payload);
    this.callsCount++;
    return this.cipherText;
  }
}

export class DecrypterSpy implements Decrypter {
  params: Decrypter.Params = {
    cipherText: faker.datatype.uuid(),
    secret: faker.datatype.uuid(),
  };
  plainText: Decrypter.Result = {
    sub: faker.datatype.uuid(),
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };

  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
    this.params = params;
    return this.plainText;
  }
}
