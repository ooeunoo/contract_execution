import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DataTransporter } from '../app/decorator/dto-transporter.decorator';
import { NetworkDTO } from '../network/network.dto';
import { ContractExecution } from './contract-execution.entity';

export class ContractExecutionDetailParamDTO {
  @DataTransporter({
    doc: { description: '컨트랙트 익스큐션 아이디' },
    props: [IsString()],
  })
  id: string;
}

export class ContractExecutionQueryDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumber(), IsOptional()],
  })
  chainId?: number;

  @DataTransporter({
    doc: { description: '컨트랙트 익스큐션 등록 주소' },
    props: [IsString(), IsOptional()],
  })
  address?: string;

  @DataTransporter({
    doc: { description: '컨트랙트 익스큐션 등록 명' },
    props: [IsString(), IsOptional()],
  })
  name?: string;
}

export class CreateContractExecutionBodyDTO {
  @DataTransporter({
    doc: { description: '네트워크 체인 아이디' },
    props: [IsNumber()],
  })
  public readonly chainId: number;

  @DataTransporter({
    doc: { description: '컨트랙트 익스큐션 등록 명' },
    props: [IsString()],
  })
  public readonly name: string;

  @DataTransporter({
    doc: { description: 'address' },
    props: [IsString()],
  })
  public readonly address: string;

  @DataTransporter({
    doc: { description: 'abi' },
    props: [IsString()],
  })
  public readonly abi: string;
}

export class ContractExecutionDTO {
  constructor(contractExecution: ContractExecution) {
    Object.assign(this, {
      id: contractExecution.id,
      network: new NetworkDTO(contractExecution.network),
      name: contractExecution.name,
      address: contractExecution.address,
      abi: contractExecution.abi,
    });
  }

  @DataTransporter({ doc: { description: '컨트랙트 익스큐션 아이디' } })
  public readonly id: number;

  @DataTransporter({ doc: { description: '네트워크 정보' } })
  public readonly network: NetworkDTO;

  @DataTransporter({ doc: { description: '컨트랙트 익스큐션 등록 명' } })
  public readonly name: string;

  @DataTransporter({ doc: { description: '컨트랙트 익스큐션 등록 주소' } })
  public readonly address: string;

  @DataTransporter({ doc: { description: '컨트랙트 익스큐션 등록 ABI' } })
  public readonly abi: string;
}
