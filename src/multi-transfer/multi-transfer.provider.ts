import { DataSource } from 'typeorm';
import { MULTI_TRANSFER_REPOSITORY_PROVIDE } from './multi-transfer.constant';
import { MultiTransfer } from './multi-transfer.entity';

export const multiTransferProvider = [
  {
    provide: MULTI_TRANSFER_REPOSITORY_PROVIDE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MultiTransfer),
    inject: ['DATA_SOURCE'],
  },
];
