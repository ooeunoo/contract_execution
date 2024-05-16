import { Test, TestingModule } from '@nestjs/testing';
import { MultiTransferHistoryController } from './multi-transfer-history.controller';

describe('MultiTransferHistoryController', () => {
  let controller: MultiTransferHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiTransferHistoryController],
    }).compile();

    controller = module.get<MultiTransferHistoryController>(MultiTransferHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
