import { Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { NetworkModule } from '../network/network.module';
import { ContractExecutionController } from './contract-execution.controller';
import { contractExecutionProvider } from './contract-execution.provider';
import { ContractExecutionService } from './contract-execution.service';

@Module({
  imports: [DatabaseModule, NetworkModule],
  providers: [...contractExecutionProvider, ContractExecutionService],
  controllers: [ContractExecutionController],
  exports: [ContractExecutionService],
})
export class ContractExecutionModule {}
