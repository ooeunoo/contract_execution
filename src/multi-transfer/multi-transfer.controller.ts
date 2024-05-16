import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { isNull } from 'lodash';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { Exception } from '../app/exception/exception';
import { EXCEPTION_CODE } from '../app/exception/exception.constant';
import { IJWTGuardRequest } from '../auth/auth.interface';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Network } from '../network/network.entity';
import { NetworkService } from '../network/network.service';
import { ROUTE } from './multi-transfer.constant';
import {
  CreateMultiTransferBodyDTO,
  MultiTransferDetailParamDTO,
  MultiTransferDTO,
  MultiTransferQueryDTO,
} from './multi-transfer.dto';
import { MultiTransferService } from './multi-transfer.service';

@Controller(ROUTE.ROOT)
export class MultiTransferController {
  constructor(
    private readonly multiTransferService: MultiTransferService,
    private readonly networkService: NetworkService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Get(ROUTE.GET_DETAIL))
  async getMultiTransfer(
    @Request() req: IJWTGuardRequest,
    @Param() param: MultiTransferDetailParamDTO,
  ) {
    const { id } = param;

    const multiTransfer = await this.multiTransferService.findOne({
      user: req.user,
      id: parseInt(id),
    });

    if (isNull(multiTransfer)) {
      throw new Exception(EXCEPTION_CODE.ERR0103, HttpStatus.BAD_REQUEST);
    }

    return new MultiTransferDTO(multiTransfer);
  }

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Get())
  async getMultiTransfers(
    @Request() req: IJWTGuardRequest,
    @Query() query: MultiTransferQueryDTO,
  ) {
    const { chainId, tokenAddress, hash, tokenSymbol } = query;

    const condition: {
      network?: Network;
      tokenAddress?: string;
      hash?: string;
      tokenSymbol?: string;
    } = {};

    if (chainId) {
      const network = await this.networkService.findOne({ chainId });

      if (!network) {
        throw new Exception(EXCEPTION_CODE.ERR0101, HttpStatus.BAD_REQUEST);
      }

      condition.network = network;
    }

    if (tokenAddress) {
      condition.tokenAddress = tokenAddress;
    }

    if (tokenAddress) {
      condition.tokenSymbol = tokenSymbol;
    }

    if (hash) {
      condition.hash = hash;
    }

    const multiTransfers = await this.multiTransferService.findAll({
      user: req.user,
      ...condition,
    });
    return multiTransfers.map((r) => new MultiTransferDTO(r));
  }

  @UseGuards(JwtAuthGuard)
  @APIControllerExport(Post())
  async createMultiTransfer(
    @Request() req: IJWTGuardRequest,
    @Body() body: CreateMultiTransferBodyDTO,
  ) {
    const { chainId, tokenAddress, memo, hash, tokenSymbol, histories } = body;

    const network = await this.networkService.findOne({ chainId });

    if (!network) {
      throw new Exception(EXCEPTION_CODE.ERR0101, HttpStatus.BAD_REQUEST);
    }

    const multiTransfer =
      await this.multiTransferService.createOneWithHistories(
        {
          user: req.user,
          network,
          tokenAddress,
          tokenSymbol,
          hash,
          memo,
        },
        histories,
      );

    return new MultiTransferDTO(multiTransfer);
  }
}
