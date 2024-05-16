import { Controller, Get, UseGuards } from '@nestjs/common';
import { APIControllerExport } from '../app/decorator/controller-export.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ROUTE } from './multi-transfer-history.constant';
import { MultiTransferHistoryService } from './multi-transfer-history.service';

@Controller(ROUTE.ROOT)
export class MultiTransferHistoryController {
  constructor(
    private readonly multiTransferHistoryService: MultiTransferHistoryService,
  ) {}
}
