import { DataSource } from 'typeorm';
import { MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE } from './multi-transfer-history.constant';
import { MultiTransferHistory } from './multi-transfer-history.entity';

export const multiTransferHistoryProvider = [
  {
    provide: MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MultiTransferHistory),
    inject: ['DATA_SOURCE'],
  },
];
