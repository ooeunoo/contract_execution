import { Inject, Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { NETWORK_REPOSITORY_PROVIDE } from './network.constant';
import { Network } from './network.entity';

@Injectable()
export class NetworkService {
  constructor(
    @Inject(NETWORK_REPOSITORY_PROVIDE)
    private networkRepository: Repository<Network>,
  ) {}

  async findOne(params: DeepPartial<Network>): Promise<Network> {
    return this.networkRepository.findOne({ where: { ...params } });
  }

  async findAll(params: DeepPartial<Network>): Promise<Network[]> {
    return this.networkRepository.find({ where: { ...params } });
  }
}
