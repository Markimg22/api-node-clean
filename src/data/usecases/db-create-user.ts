import { CreateUser } from '@/domain/usecases';
import {
  CreateUserRepository,
  CheckUserByEmailRepository,
} from '@/data/protocols/repositories';

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async create(params: CreateUser.Params): Promise<CreateUser.Result> {
    const { name, email, googleId, avatarUrl } = params;
    const userAlreadyExists = await this.checkUserByEmailRepository.check(
      email
    );
    if (userAlreadyExists) return null;
    const user = await this.createUserRepository.create({
      name,
      email,
      googleId,
      avatarUrl,
    });
    return user;
  }
}
