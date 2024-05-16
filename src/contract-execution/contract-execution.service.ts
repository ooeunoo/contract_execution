import { Injectable, Inject } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { Network } from '../network/network.entity';
import { User } from '../user/user.entity';
import { CONTRACT_EXECUTION_REPOSITORY_PROVIDE } from './contract-execution.constant';
import { ContractExecution } from './contract-execution.entity';

@Injectable()
export class ContractExecutionService {
  private relations = ['network', 'user'];

  constructor(
    @Inject(CONTRACT_EXECUTION_REPOSITORY_PROVIDE)
    private contractExecutionRepository: Repository<ContractExecution>,
  ) {}

  async findOneById(id: number): Promise<ContractExecution> {
    return this.contractExecutionRepository.findOne({ where: { id } });
  }

  async findOne(
    params: DeepPartial<ContractExecution>,
  ): Promise<ContractExecution> {
    return this.contractExecutionRepository.findOne({
      where: { ...params },
      relations: this.relations,
    });
  }

  async findAll(
    params: DeepPartial<ContractExecution>,
  ): Promise<ContractExecution[]> {
    return this.contractExecutionRepository.find({
      where: { ...params },
      relations: this.relations,
    });
  }

  async createOne(
    params: DeepPartial<ContractExecution>,
  ): Promise<ContractExecution> {
    return this.contractExecutionRepository.save({
      ...params,
    });
  }

  async deleteOne(
    params: DeepPartial<ContractExecution>,
  ): Promise<DeleteResult> {
    return this.contractExecutionRepository.delete({ ...params });
  }
}
