import { IResponse } from '../app.interface';
import { DataTransporter } from '../decorator/dto-transporter.decorator';

export class ResponseDTO implements IResponse {
  @DataTransporter({ doc: { description: '응답 성공 여부' } })
  public readonly success: boolean;
}
