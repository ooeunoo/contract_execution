import { Request } from 'express';
import { RequestExtraDTO } from './dto/request-extra.dto';

export interface IResponse {
  success: boolean;
  data?: any;
}

export interface IExceptionResponse extends IResponse {
  code: string;
  message: string;
}

export interface IRequestAugmented extends Request {
  extras?: RequestExtraDTO;
}

export interface IRequestLocation {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface IUserAgentResult {
  return;
}
