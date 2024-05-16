import { DataSource } from 'typeorm';
import { USER_REPOSITORY_PROVIDE } from './user.constant';
import { User } from './user.entity';

export const userProvider = [
  {
    provide: USER_REPOSITORY_PROVIDE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
