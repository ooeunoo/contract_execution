import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * 데이터 추출 (api doc 및 response data) 데코레이터
 * @param data { doc: swagger api property, props: Validation[] }
 * @returns
 */
export function DataTransporter(data?: {
  doc?: ApiPropertyOptions;
  props?: PropertyDecorator[];
}) {
  const decorators = [ApiProperty(data?.doc), Expose()];

  if (data?.props) {
    decorators.push(...data.props);
  }

  return applyDecorators(...decorators);
}
