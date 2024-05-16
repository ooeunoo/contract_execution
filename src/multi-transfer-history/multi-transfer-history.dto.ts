import { IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { MultiTransferHistory } from './multi-transfer-history.entity';

export class CreateMultiTransferHistoryBodyDTO {
  @DataTransporter({
    doc: { description: '보낸 주소' },
    props: [IsString()],
  })
  public readonly from: string;

  @DataTransporter({
    doc: { description: '받는 주소' },
    props: [IsString()],
  })
  public readonly to: string;

  @DataTransporter({
    doc: { description: '보낸 수량' },
    props: [IsString()],
  })
  public readonly amount: string;
}

export class MultiTransferHistoryDTO {
  constructor(multiTransferHistory: MultiTransferHistory) {
    Object.assign(this, {
      from: multiTransferHistory.from,
      to: multiTransferHistory.to,
      amount: multiTransferHistory.to,
    });
  }

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 내역 보낸 주소' } })
  public readonly from: string;

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 내역 받는 주소' } })
  public readonly to: string;

  @DataTransporter({ doc: { description: '멀티 트랜스퍼 내역 보낸 수량' } })
  public readonly amount: string;
}
