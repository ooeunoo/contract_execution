import { Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { NetworkModule } from '../network/network.module';
import { multiTransferHistoryProvider } from './multi-transfer-history.provider';
import { MultiTransferHistoryService } from './multi-transfer-history.service';
import { MultiTransferHistoryController } from './multi-transfer-history.controller';

@Module({
  imports: [DatabaseModule, NetworkModule],
  providers: [...multiTransferHistoryProvider, MultiTransferHistoryService],
  exports: [MultiTransferHistoryService],
  controllers: [MultiTransferHistoryController],
})
export class MultiTransferHistoryModule {}
