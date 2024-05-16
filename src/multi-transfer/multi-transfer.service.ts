import { Inject, Injectable } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  QueryRunner,
  Repository,
} from 'typeorm';
import dataSource from '../app/database/database.source';
import { MultiTransferHistory } from '../multi-transfer-history/multi-transfer-history.entity';
import { MultiTransferHistoryService } from '../multi-transfer-history/multi-transfer-history.service';
import { MULTI_TRANSFER_REPOSITORY_PROVIDE } from './multi-transfer.constant';
import { MultiTransfer } from './multi-transfer.entity';

@Injectable()
export class MultiTransferService {
  private relations = ['network', 'user', 'histories'];

  constructor(
    @Inject(MULTI_TRANSFER_REPOSITORY_PROVIDE)
    private multiTransferRepository: Repository<MultiTransfer>,
    private multiTransferHistoryService: MultiTransferHistoryService,
  ) {}

  async findOneById(id: number): Promise<MultiTransfer> {
    return this.multiTransferRepository.findOne({ where: { id } });
  }

  async findOne(params: DeepPartial<MultiTransfer>): Promise<MultiTransfer> {
    return this.multiTransferRepository.findOne({
      where: { ...params },
      relations: this.relations,
    });
  }

  async findAll(params: DeepPartial<MultiTransfer>): Promise<MultiTransfer[]> {
    return this.multiTransferRepository.find({
      where: { ...params },
      relations: this.relations,
    });
  }

  async createOne(
    params: DeepPartial<MultiTransfer>,
    manager?: EntityManager,
  ): Promise<MultiTransfer> {
    const createEntity: any = this.multiTransferRepository.create(params);

    if (manager) {
      return manager.save(MultiTransfer, createEntity);
    }
    return this.multiTransferRepository.save(createEntity);
  }

  async createOneWithHistories(
    params: DeepPartial<MultiTransfer>,
    histories: DeepPartial<MultiTransferHistory>[],
  ): Promise<MultiTransfer> {
    let queryRunner: QueryRunner = null;
    try {
      queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction('READ COMMITTED');

      const { manager } = queryRunner;

      const multiTransfer = await this.createOne(params, manager);

      await this.multiTransferHistoryService.createAll(
        histories.map((history) => {
          return {
            ...history,
            multiTransfer,
          };
        }),
        manager,
      );
      await queryRunner.commitTransaction();
      return multiTransfer;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async deleteOne(params: DeepPartial<MultiTransfer>): Promise<DeleteResult> {
    return this.multiTransferRepository.delete({ ...params });
  }
}
