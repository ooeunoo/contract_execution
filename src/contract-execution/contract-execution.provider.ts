import { DataSource } from 'typeorm';
import { CONTRACT_EXECUTION_REPOSITORY_PROVIDE } from './contract-execution.constant';
import { ContractExecution } from './contract-execution.entity';

export const contractExecutionProvider = [
  {
    provide: CONTRACT_EXECUTION_REPOSITORY_PROVIDE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ContractExecution),
    inject: ['DATA_SOURCE'],
  },
];
