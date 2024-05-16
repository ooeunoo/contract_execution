import { Injectable, Inject } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { AuthProvider, USER_REPOSITORY_PROVIDE } from './user.constant';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDE)
    private userRepository: Repository<User>,
  ) {}

  async findOne(params: DeepPartial<User>): Promise<User> {
    return this.userRepository.findOne({ where: { ...params } });
  }

  async createOne(
    provider: AuthProvider,
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    return this.userRepository.save({
      provider,
      email,
      name,
      password: password ?? '',
    });
  }
}
