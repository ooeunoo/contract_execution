import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, EntityManager, Repository } from 'typeorm';
import { MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE } from './multi-transfer-history.constant';
import { MultiTransferHistory } from './multi-transfer-history.entity';

@Injectable()
export class MultiTransferHistoryService {
  private relations = ['multiTransfer'];

  constructor(
    @Inject(MULTI_TRANSFER_HISTORY_REPOSITORY_PROVIDE)
    private multiTransferRepository: Repository<MultiTransferHistory>,
  ) {}

  async findOneById(id: number): Promise<MultiTransferHistory> {
    return this.multiTransferRepository.findOne({ where: { id } });
  }

  async findOne(
    params: DeepPartial<MultiTransferHistory>,
  ): Promise<MultiTransferHistory> {
    return this.multiTransferRepository.findOne({
      where: { ...params },
      relations: this.relations,
    });
  }

  async findAll(
    params: DeepPartial<MultiTransferHistory>,
  ): Promise<MultiTransferHistory[]> {
    return this.multiTransferRepository.find({
      where: { ...params },
      relations: this.relations,
    });
  }

  async createOne(
    params: DeepPartial<MultiTransferHistory>,
  ): Promise<MultiTransferHistory> {
    return this.multiTransferRepository.save({
      ...params,
    });
  }

  async createAll(
    params: DeepPartial<MultiTransferHistory>[],
    manager?: EntityManager,
  ): Promise<MultiTransferHistory[]> {
    const createEntities: any[] = params.map((param) =>
      this.multiTransferRepository.create(param),
    );

    if (manager) {
      return manager.save(MultiTransferHistory, createEntities);
    }
    return this.multiTransferRepository.save(createEntities);
  }

  async deleteOne(
    params: DeepPartial<MultiTransferHistory>,
  ): Promise<DeleteResult> {
    return this.multiTransferRepository.delete({ ...params });
  }
}
