import { Module } from '@nestjs/common';
import { DatabaseModule } from '../app/database/database.module';
import { MultiTransferHistoryModule } from '../multi-transfer-history/multi-transfer-history.module';
import { NetworkModule } from '../network/network.module';
import { MultiTransferController } from './multi-transfer.controller';
import { multiTransferProvider } from './multi-transfer.provider';
import { MultiTransferService } from './multi-transfer.service';

@Module({
  imports: [DatabaseModule, NetworkModule, MultiTransferHistoryModule],
  providers: [...multiTransferProvider, MultiTransferService],
  controllers: [MultiTransferController],
  exports: [MultiTransferService],
})
export class MultiTransferModule {}
