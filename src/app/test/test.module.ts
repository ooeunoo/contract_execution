import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { ContractExecutionModule } from '../../contract-execution/contract-execution.module';
import { NetworkModule } from '../../network/network.module';
import { MultiTransferModule } from '../../multi-transfer/multi-transfer.module';
import { MultiTransferHistoryModule } from '../../multi-transfer-history/multi-transfer-history.module';
import { DatabaseModule } from '../database/database.module';

export class TestModule {
  module: TestingModule;
  app: INestApplication;

  async createTestModule(): Promise<INestApplication> {
    this.module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UserModule,
        AuthModule,
        ContractExecutionModule,
        NetworkModule,
        MultiTransferModule,
        MultiTransferHistoryModule,
      ],
    }).compile();

    this.app = this.module.createNestApplication();

    await this.app.init();
    return this.app;
  }
}
