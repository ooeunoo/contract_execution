import { Test, TestingModule } from '@nestjs/testing';
import { MultiTransferController } from './multi-transfer.controller';

describe('MultiTransferController', () => {
  let controller: MultiTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiTransferController],
    }).compile();

    controller = module.get<MultiTransferController>(MultiTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
