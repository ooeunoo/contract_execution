import { Test, TestingModule } from '@nestjs/testing';
import { ContractExecutionController } from './contract-execution.controller';

describe('ContractExecutionController', () => {
  let controller: ContractExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContractExecutionController],
    }).compile();

    controller = module.get<ContractExecutionController>(ContractExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
