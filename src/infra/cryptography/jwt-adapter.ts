import { Decrypter, Encrypter } from '@/data/protocols/cryptography';

import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
    const { cipherText, secret } = params;
    return jwt.verify(cipherText, secret) as Decrypter.Result;
  }

  async encrypt(params: Encrypter.Params): Promise<Encrypter.Result> {
    const { payload, secret, expiresIn, subject } = params;
    return jwt.sign(payload, secret, { expiresIn, subject });
  }
}
