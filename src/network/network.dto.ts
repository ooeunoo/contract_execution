import {
  IsBoolean,
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { Network } from './network.entity';

export class NetworkDTO {
  constructor(network: Network) {
    Object.assign(this, {
      id: network.id,
      name: network.name,
      label: network.label,
      chainId: network.chainId,
      testnet: network.testnet,
      expolorer: network.explorer,
      multicall: network.multicall,
      currency: network.currency,
      currencyLogo: network.currencyLogo,
    });
  }

  @DataTransporter({ doc: { description: '네트워크 아이디' } })
  public readonly id: number;

  @DataTransporter({ doc: { description: '네트워크 이름' } })
  public readonly name: string;

  @DataTransporter({ doc: { description: '네트워크 라벨' } })
  public readonly label: string;

  @DataTransporter({ doc: { description: '네트워크 체인 아이디' } })
  public readonly chainId: number;

  @DataTransporter({ doc: { description: '네트워크 테스트넷 여부' } })
  public readonly testnet: boolean;

  @DataTransporter({ doc: { description: '네트워크 익스플로어' } })
  public readonly explorer: string;

  @DataTransporter({ doc: { description: '네트워크 멀티콜 주소' } })
  public readonly multicall: string;

  @DataTransporter({ doc: { description: '네트워크 통화 심볼 명' } })
  public readonly currency: string;

  @DataTransporter({ doc: { description: '네트워크 통화 심볼 로고' } })
  public readonly currencyLogo: string;
}

export class NetworkQueryDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumberString(), IsOptional()],
  })
  chainId?: number;

  @DataTransporter({
    doc: { description: '네트워크 명' },
    props: [IsString(), IsOptional()],
  })
  name?: string;

  @DataTransporter({
    doc: { description: '네트워크 테스트넷' },
    props: [IsBooleanString(), IsOptional()],
  })
  testnet?: boolean;
}
