import { DataSource } from 'typeorm';
import { NETWORK_REPOSITORY_PROVIDE } from './network.constant';
import { Network } from './network.entity';

export const netweorkProvider = [
  {
    provide: NETWORK_REPOSITORY_PROVIDE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Network),
    inject: ['DATA_SOURCE'],
  },
];
