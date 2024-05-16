import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { isTrue } from '../app/util/type';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ROUTE } from './network.constant';
import { NetworkDTO, NetworkQueryDTO } from './network.dto';
import { NetworkService } from './network.service';

@Controller(ROUTE.ROOT)
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Get())
  async getNetworks(@Query() query: NetworkQueryDTO) {
    const { chainId, testnet, name } = query;

    const condition: { name?: string; chainId?: number; testnet?: number } = {};

    if (chainId) {
      condition.chainId = chainId;
    }

    if (testnet) {
      condition.testnet = isTrue(testnet) ? 1 : 0;
    }

    if (name) {
      condition.name = name;
    }

    console.log(condition);

    const networks = await this.networkService.findAll({
      ...condition,
    });

    console.log(networks);

    return networks.map((r) => new NetworkDTO(r));
  }
}
