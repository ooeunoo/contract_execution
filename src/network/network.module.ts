import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { DatabaseModule } from '../app/database/database.module';
import { netweorkProvider } from './network.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...netweorkProvider, NetworkService],
  controllers: [NetworkController],
  exports: [NetworkService],
})
export class NetworkModule {}
