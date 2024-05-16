import { Test, TestingModule } from '@nestjs/testing';
import { ContractExecutionService } from './contract-execution.service';

describe('ContractExecutionService', () => {
  let service: ContractExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractExecutionService],
    }).compile();

    service = module.get<ContractExecutionService>(ContractExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
