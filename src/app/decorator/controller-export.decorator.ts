import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiQuery,
  ApiQueryOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

/**
 * Controller 데코레이터 콤바인
 * @param route route ex) GET(ROUTE_PATH.ROOT)
 * @param data 데코레이터 인자
 * @returns
 */
export function APIControllerExport(
  route: MethodDecorator,
  data?: {
    operation?: ApiOperationOptions;
    params?: ApiParamOptions;
    body?: ApiBodyOptions;
    query?: ApiQueryOptions;
    response?: ApiResponseOptions;
  },
) {
  const decorators = [];

  if (data?.operation) {
    decorators.push(ApiOperation(data.operation));
  }

  if (data?.params) {
    decorators.push(ApiParam(data.params));
  }

  if (data?.query) {
    decorators.push(ApiQuery(data.query));
  }

  if (data?.body) {
    decorators.push(ApiBody(data.body));
  }

  if (data?.response) {
    decorators.push(ApiResponse(data.response));
  }

  return applyDecorators(route, ...decorators);
}
