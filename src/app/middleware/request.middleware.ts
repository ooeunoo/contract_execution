import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { IRequestAugmented } from '../app.interface';
import { RequestExtraDTO } from '../dto/request-extra.dto';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: IRequestAugmented, res: Response, next: () => void): any {
    // 요청 Extra 생성
    req.extras = new RequestExtraDTO(req);

    next();
  }
}
